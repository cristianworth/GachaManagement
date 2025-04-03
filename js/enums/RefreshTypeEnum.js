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

    static BuscaIdPorNome(nome) {
        let enumEncontrado = this.values.find(x => x.value == nome);

        if (enumEncontrado)
        {
            return enumEncontrado.id;
        }

        return null;
    }

    static BuscaNomePorId(id) {
        let enumEncontrado = this.values.find(x => x.id == id);

        if (enumEncontrado)
        {
            return enumEncontrado.value;
        }

        return null;
    }
    
    static BuscaDiasPorId(id) {
        let enumEncontrado = this.values.find(x => x.id == id);

        if (enumEncontrado)
        {
            return enumEncontrado.days;
        }

        return null;
    }
}

export default RefreshTypeEnum;
