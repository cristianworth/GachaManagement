// js\enums\RefreshTypeEnum.js
class RefreshTypeEnum {
    static values = [
        {id: 0, value: 'Event', days: null},
        {id: 1, value: 'Daily', days: 1},
        {id: 2, value: 'Weekly', days: 7},
        {id: 3, value: 'TwoWeeks', days: 14},
        {id: 4, value: 'BiMonthly', days: 15},
        {id: 5, value: 'FourWeeks', days: 28},
        {id: 6, value: 'Monthly', days: 31},
        {id: 7, value: 'SixWeeks', days: 42},
    ];

    static findIdByName(name) {
        let foundEnum = this.values.find(x => x.value == name);

        if (foundEnum)
        {
            return foundEnum.id;
        }

        return null;
    }

    static findNameById(id) {
        let foundEnum = this.values.find(x => x.id == id);

        if (foundEnum)
        {
            return foundEnum.value;
        }

        return null;
    }
    
    static findDaysById(id) {
        let foundEnum = this.values.find(x => x.id == id);

        if (foundEnum)
        {
            return foundEnum.days;
        }

        return null;
    }
}

export default RefreshTypeEnum;
