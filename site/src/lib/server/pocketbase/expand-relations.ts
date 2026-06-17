import { z } from 'zod';

type RelationSchemas = Record<string, z.ZodType>;

export type ExpandedRecord<
	Base extends z.ZodObject<z.ZodRawShape>,
	Relations extends RelationSchemas
> = Omit<z.infer<Base>, keyof Relations | 'expand'> & {
	[K in keyof Relations]: z.infer<Relations[K]>;
};

/**
 * Parses PocketBase records and hoists `expand.<relation>` onto `<relation>`.
 *
 * @example
 * { plugin: "abc", expand: { plugin: { id: "abc", ... } } }
 * // becomes
 * { plugin: { id: "abc", ... } }
 */
export function expand<Base extends z.ZodObject<z.ZodRawShape>, Relations extends RelationSchemas>(
	base: Base,
	relations: Relations
) {
	const expandShape = Object.fromEntries(
		Object.entries(relations).map(([key, schema]) => [key, schema.optional()])
	) as { [K in keyof Relations]: z.ZodOptional<Relations[K]> };

	const schema = base.extend({
		expand: z.object(expandShape).optional()
	});

	return schema.transform((record): ExpandedRecord<Base, Relations> => {
		const { expand, ...rest } = record as typeof record & {
			expand?: { [K in keyof Relations]?: z.infer<Relations[K]> };
		};
		const result = { ...rest } as ExpandedRecord<Base, Relations>;

		for (const key of Object.keys(relations) as (keyof Relations & string)[]) {
			const expanded = expand?.[key];
			if (expanded !== undefined) {
				(result as Record<string, unknown>)[key] = expanded;
			}
		}

		return result;
	});
}
