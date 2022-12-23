const shopTemplates = [ //TODO: Add more shops
    {
        name: "Weapon Shop", //TODO: combine with weapon classes
        items: [
            { name: "Pistol", type:"ranged weapon", price: 100,amount: 5},
            { name: "Rifle", type:"ranged weapon",price: 400, amount: 2 },
            { name: "Shotgun", type:"ranged weapon",price: 300, amount: 2 },
            { name: "Bolter", type:"ranged weapon",price: 300, amount: 2 },
            { name: "lightsaber", type:"melee weapon",price: 1000, amount: 1 },
            { name: "Bolter ammo", type:"ammo",price: 25, amount: 100},
        ]
    },
    {
        name: "Food store",
        items: [
            { name: "Bread", type:"food", price: 10, amount: 10 },
            { name:"Water", type:"food", price: 20, amount: 10 },
            { name: "MRE", type:"food", price: 30, amount: 10 }
        ]
    },
    {
        name: "Clothing Shop",
        items: [
            { name: "T-Shirt",type:'cloth', price: 10, amount: 10 },
            { name: "Pants", type:'cloth',price: 20, amount: 10 },
            { name: "Hat", type:'cloth',price: 30, amount: 10 }
        ]
    },
    {
        name: "Misc Shop",
        items: [
            { name: "Bandage", type:'medicine', price: 10, amount: 10 },
            { name: "Painkiller", type:'medicine', price: 20, amount: 10 },
            { name: "Lockpick", type:'misc', price: 30, amount: 10 },
            { name: "Flashlight", type:'misc', price: 30, amount: 10 },
        ]
    },
    {
        name: "Auto shop",
        items: [
            { name: "Car", price: 10000, amount: 1 },
            { name: "Motorcycle", price: 5000, amount: 1 },
            { name: "Bicycle", price: 100, amount: 1 }
        ]
    }
];

export default shopTemplates
