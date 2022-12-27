const items = {
    food:[
        {name:'Bread',type:'food', effect: 5},
        {name:'Water',type:'food', effect: 5},
        {name:'MRE',type:'food', effect: 20},
    ],
    meleeWeapon:[
        {name:'Knife',type:'weapon', damage: 10,hands:1},
        {name:'Metal baton',type:'weapon', damage: 15,hands: 1},
        {name:'Lightsaber',type:'weapon', damage: 100,hands: 2},

    ],
    rangedWeapon:[
        {name:'Pistol',type:'weapon', damage: 20,ammoType: 'bullet', reloadTime: 1,hands:1},
        {name:'Rifle',type:'weapon', damage: 50,ammoType: 'bullet', reloadTime: 2},
        {name:'Shotgun',type:'weapon', damage: 100,ammoType: 'shell', reloadTime: 2},
        {name:'Sniper',type:'weapon', damage: 200,ammoType: 'bullet', reloadTime: 2},
        {name:'StarShip Launcher',type:'weapon', damage: 500,ammoType: 'rocket', reloadTime: 3},
    ],
    medicine:[
        {name:'Bandage',type:'medicine', effect: 10},
        {name:'Painkiller',type:'medicine', effect: 20},
        {name:'Antibiotics',type:'medicine', effect: 20},
        {name:'Morphine',type:'medicine', effect: 30},
    ],
    ammo:[
        {name:'9mm',type:'ammo', weapon: 10},
        {name:'45',type:'ammo', effect: 20},
        {name:'762',type:'ammo', effect: 30},
    ],
    armor:[
        {name:'Helmet',type:'armor',armorType:"head", armor: 5},
        {name:'Vest',type:'armor',armorType:"body", armor: 5},
        {name:'Boots',type:'armor',armorType:"legs", armor: 5},
        {name:'Personal rookie suit',armorType:"full",type:'armor', effect: 30},
    ],
    equipment:[
        {name:'Backpack',type:'equipment'}, //TODO: add effect and weight
        {name:'Smart Glasses',type:'equipment'},
        {name:'Binoculars',type:'equipment'},
        {name:'Flashlight',type:'equipment'},
        {name:'Compass',type:'equipment'},
        {name:'Personal jump pack',type:'equipment'},
    ],
    misc:[
        {name:'Map',type:'misc', effect: 30},
    ],
}
export default items;
