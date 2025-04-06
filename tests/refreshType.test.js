// tests\refreshType.test.js
import RefreshTypeEnum from '../js/enums/RefreshTypeEnum.js'

test('RefreshTypeEnum finds correct values', () => {
    expect(RefreshTypeEnum.findIdByName('Weekly')).toBe(2);
    expect(RefreshTypeEnum.findNameById(2)).toBe('Weekly');
    expect(RefreshTypeEnum.findDaysById(2)).toBe(7);
});