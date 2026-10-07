use serde::Deserialize;
use serde_json::Value as JsonValue;
use sqlx::sqlite::{Sqlite, SqliteArguments};
use sqlx::query::Query;
use tauri::State;
use tauri_plugin_sql::{DbInstances, DbPool};

#[derive(Debug, Deserialize)]
pub struct BatchStatement {
    sql: String,
    #[serde(default)]
    params: Vec<JsonValue>,
}

fn bind_value<'q>(
    query: Query<'q, Sqlite, SqliteArguments<'q>>,
    value: JsonValue,
) -> Query<'q, Sqlite, SqliteArguments<'q>> {
    match value {
        JsonValue::Null => query.bind(None::<String>),
        JsonValue::Bool(flag) => query.bind(i64::from(flag)),
        JsonValue::Number(number) => match number.as_i64() {
            Some(integer) => query.bind(integer),
            None => query.bind(number.as_f64().unwrap_or_default()),
        },
        JsonValue::String(text) => query.bind(text),
        other => query.bind(other.to_string()),
    }
}

/// Runs `statements` in one SQLite transaction on the pool `tauri-plugin-sql` opened for
/// `db` (e.g. `sqlite:app.db`). Its own `execute` uses a pooled connection per call, so a
/// BEGIN/COMMIT sent from the frontend can't span statements; multi-step writes that must
/// not half-apply (migrations, delete + tombstone) go through here instead.
#[tauri::command]
pub async fn db_execute_batch(
    instances: State<'_, DbInstances>,
    db: String,
    statements: Vec<BatchStatement>,
) -> Result<(), String> {
    let instances = instances.0.read().await;
    let pool = match instances.get(&db) {
        Some(DbPool::Sqlite(pool)) => pool,
        _ => return Err(format!("database {db} is not loaded")),
    };

    let mut transaction = pool
        .begin()
        .await
        .map_err(|error| format!("failed to start transaction: {error}"))?;

    for statement in statements {
        let mut query = sqlx::query(&statement.sql);
        for value in statement.params {
            query = bind_value(query, value);
        }

        query
            .execute(&mut *transaction)
            .await
            .map_err(|error| format!("batch statement failed ({}): {error}", statement.sql))?;
    }

    transaction
        .commit()
        .await
        .map_err(|error| format!("failed to commit transaction: {error}"))
}
