class RefreshTypeEnum {
    static values = [
        {id: 0, value: 'Event'},
        {id: 1, value: 'Daily'},
        {id: 2, value: 'Weekly'},
        {id: 3, value: 'Monthly'},
        {id: 4, value: 'BiMonthly'},
    ];

    static BuscaEnumPorNome(nome) {
        let enumEncontrado = this.values.find(x => x.value == nome);

        if (enumEncontrado)
        {
            return enumEncontrado.id 
        }

        return null;
    }
}
