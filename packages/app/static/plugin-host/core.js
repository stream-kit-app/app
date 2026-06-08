// src/lib/core/plugins/host/core.ts
var VARIABLE_PATTERN = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
function interpolateVariables(template, variables) {
  return template.replace(VARIABLE_PATTERN, (_match, key) => {
    const value = variables[key];
    if (value === void 0 || value === null) {
      return "";
    }
    return String(value);
  });
}
export {
  interpolateVariables
};
