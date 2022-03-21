import EnumDefine from '../src'

test('basic', () => {
    const TestEnum: any = new EnumDefine({
        One: 1,
        Two: 2,
        Three: 3,
    })
    expect(TestEnum.One).toEqual(1)
    expect(TestEnum.getItem('One')).toEqual({ code: 1, desc: '' })
});

test('basic2', () => {
    const TestEnum: any = new EnumDefine(['One', 'Two', 'Three'])
    expect(TestEnum.One).toEqual(0)
    expect(TestEnum.getItem('One')).toEqual({ code: 0, desc: '' })
});

test('basic3', () => {
    const TestEnum: any = new EnumDefine({
        One: { code: 1, desc: '结果为1' },
        Two: { code: 2, desc: '结果为2' },
        Three: { code: 3, desc: '结果为3' },
    })
    expect(TestEnum.One).toEqual(1)
    expect(TestEnum.getItem('One')).toEqual({ code: 1, desc: '结果为1' })
    expect(TestEnum.getItemDesc('One')).toEqual('结果为1')
    expect(TestEnum.sizeOf()).toEqual(3)
});

test('name', () => {
    const TestEnum1: any = new EnumDefine(['One', 'Two', 'Three'], 'Number')
    expect(TestEnum1.getName()).toEqual('Number')
    const TestEnum2: any = new EnumDefine(['One', 'Two', 'Three'])
    expect(TestEnum2.getName()).toEqual('Enum')
    const TestEnum3: any = new EnumDefine(['One', 'Two', 'Three'], {
        name: 'Number',
    })
    expect(TestEnum3.getName()).toEqual('Number')
});

test('ignoreCase', () => {
    const TestEnum: any = new EnumDefine({
        One: { code: 1, desc: '结果为1' },
        Two: { code: 2, desc: '结果为2' },
        Three: { code: 3, desc: '结果为3' },
    })
    expect(TestEnum.getItem('one')).toEqual({ code: 1, desc: '结果为1' })
});

test('separator', () => {
    const TestEnum: any = new EnumDefine({
        One: { code: 1, desc: '结果为1' },
        Two: { code: 2, desc: '结果为2' },
        Three: { code: 3, desc: '结果为3' },
    })
    expect(TestEnum.toString()).toEqual('One | Two | Three')
});