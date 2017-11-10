import * as Utils from 'utils/utils';

describe('querySubParamValue', () => {
    const testQuery = '?param1=value1&param2=value2&param3=value3';

    test('should return null if nothing matches without value', () => {
        const result = Utils.querySubParamValue(testQuery, 'param4');
        expect(result).toBe(null);
    });

    test('should return null if nothing matches with value', () => {
        const result = Utils.querySubParamValue(testQuery, 'param3', 'notpresent');
        expect(result).toBe(null);
    });

    test('should substitute the expected query results for a key/value match', () => {
        const result = Utils.querySubParamValue(testQuery, 'param2', 'value2', 'param5=value5&');
        expect(result).toBe('?param1=value1&param5=value5&param3=value3');
    });

    test('should substitute the expected query results for a key-only match', () => {
        const result = Utils.querySubParamValue(testQuery, 'param2', null, 'param5=value5&');
        expect(result).toBe('?param1=value1&param5=value5&param3=value3');
    });

    test('should not substitute for a key-only match if the key does not exist', () => {
        const result = Utils.querySubParamValue(testQuery, 'param4', null, 'BLAH&');
        expect(result).toBe(null);
    });

    test('should substitute a key-value match if the value does not exist', () => {
        const result = Utils.querySubParamValue(testQuery, 'param2', 'notpresent', 'BLAH&');
        expect(result).toBe(null);
    });

    test('should substitute the expected query results for a key in different places in query', () => {
        const first = Utils.querySubParamValue(testQuery, 'param1');
        expect(first).toBe('?param2=value2&param3=value3');

        const middle = Utils.querySubParamValue(testQuery, 'param2');
        expect(middle).toBe('?param1=value1&param3=value3');
        
        const end = Utils.querySubParamValue(testQuery, 'param3');
        expect(end).toBe('?param1=value1&param2=value2');
    });
});