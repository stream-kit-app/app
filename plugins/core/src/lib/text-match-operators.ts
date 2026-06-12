export const textMatchOperators = [
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' }
] as const;

export const valuelessTextMatchOperators = [{ value: 'isEmpty', label: 'Is empty' }] as const;

export const ifConditionOperators = [...textMatchOperators, ...valuelessTextMatchOperators] as const;

export const valuelessTextOperatorValues = valuelessTextMatchOperators.map(
	(operator) => operator.value
);
