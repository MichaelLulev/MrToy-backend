

export function getDefaultUsers() {
    return JSON.parse(JSON.stringify(defaultUsers))
}


const defaultUsers = [
    {
        _id: 'doughy-delights-123',
        fullName: 'John Dough',
        username: 'breadman',
        password: 'flourPower123',
        balance: 200,
        isAdmin: false,
        cartItems: [],
        boughtItems: [],
    },
    {
        _id: 'syrupy-skills-456',
        fullName: 'Sally Sizzle',
        username: 'pancakeQueen',
        password: 'SyrupLover99',
        balance: 200,
        isAdmin: false,
        cartItems: [],
        boughtItems: [],
    },
    {
        _id: 'mars-maverick-789',
        fullName: 'Mike Rover',
        username: 'spaceCadet',
        password: 'MarsIsMyHome!2023',
        balance: 200,
        isAdmin: false,
        cartItems: [],
        boughtItems: [],
    },
    {
        _id: 'purrfect-pal-101',
        fullName: 'Fiona Feline',
        username: 'catWhisperer',
        password: 'PurrPurrMeow',
        balance: 200,
        isAdmin: false,
        cartItems: [],
        boughtItems: [],
    },
    {
        _id: 'byte-boss-202',
        fullName: 'Gary Gigabyte',
        username: 'adminGuru',
        password: 'SuperSecure!2023',
        balance: 200,
        isAdmin: true,
        cartItems: [],
        boughtItems: [],
    }
]