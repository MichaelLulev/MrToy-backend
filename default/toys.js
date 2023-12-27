import { utilService } from "../services/util.service.js"


export function getDefaultToys() {
    return JSON.parse(JSON.stringify(defaultToys))
}


const defaultToys = [
    {
        _id: utilService.makeId(),
        name: "Plush Teddy Bear",
        description: "A soft, cuddly teddy bear in pastel colors, perfect for hugs and comfort.",
        price: 15.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Plush", "Soft"]
    },
    {
        _id: utilService.makeId(),
        name: "Colorful Wooden Puzzle",
        description: "A bright, educational wooden puzzle, ideal for developing motor skills.",
        price: 12.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Educational", "Puzzle"]
    },
    {
        _id: utilService.makeId(),
        name: "Superhero Action Figure",
        description: "A dynamic superhero figure, ready for adventurous play and storytelling.",
        price: 18.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Action", "Collectible"]
    },
    {
        _id: utilService.makeId(),
        name: "Family Board Game",
        description: "A classic board game that promises fun and bonding for the whole family.",
        price: 20.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Family", "Game"]
    },
    {
        _id: utilService.makeId(),
        name: "Remote-Controlled Car",
        description: "A high-speed remote-controlled car for thrilling races and play.",
        price: 29.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Electronic", "Vehicle"]
    },
    {
        _id: utilService.makeId(),
        name: "Detailed Dollhouse",
        description: "An intricately designed dollhouse, complete with miniature furniture.",
        price: 45.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Imaginative Play", "Collectible"]
    },
    {
        _id: utilService.makeId(),
        name: "Kid's Musical Instruments",
        description: "Colorful and fun musical instruments, perfect for introducing kids to music.",
        price: 22.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Educational", "Music"]
    },
    {
        _id: utilService.makeId(),
        name: "Outdoor Swing Set",
        description: "A sturdy and safe swing set, ideal for hours of outdoor fun.",
        price: 120.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Outdoor", "Active Play"]
    },
    {
        _id: utilService.makeId(),
        name: "Vibrant Spinner Yo-Yo",
        description: "A colorful, patterned yo-yo, perfect for fun and skillful play.",
        price: 9.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Skill Toy", "Active Play"]
    },
    {
        _id: utilService.makeId(),
        name: "Classic Wooden Express Train",
        description: "Timeless wooden train toy, combining durability with classic charm.",
        price: 24.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Imaginative Play", "Collectible"]
    },
    {
        _id: utilService.makeId(),
        name: "Sunny Quackers Rubber Duck",
        description: "Bright and playful rubber duck for joyful bath times.",
        price: 5.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Bath Toy", "Water Play"]
    },
    {
        _id: utilService.makeId(),
        name: "Skyward Precision Model Airplane",
        description: "Intricately detailed model airplane for enthusiasts and collectors.",
        price: 39.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Collectible", "Aviation"]
    },
    {
        _id: utilService.makeId(),
        name: "Whimsical Unicorn Plush Toy",
        description: "A vibrant and soft unicorn plush, perfect for fantasy-loving kids.",
        price: 17.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Plush", "Fantasy"]
    },
    {
        _id: utilService.makeId(),
        name: "Intricate Puzzle Cube",
        description: "A colorful, challenging puzzle cube for brain-teasing fun.",
        price: 11.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Puzzle", "Brain Game"]
    },
    {
        _id: utilService.makeId(),
        name: "Fluffy Panda Pillow",
        description: "A soft, fluffy panda-shaped pillow, great for cuddling.",
        price: 14.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Plush", "Soft"]
    },
    {
        _id: utilService.makeId(),
        name: "Electronic Toy Train",
        description: "A modern electronic train with vibrant colors and realistic details.",
        price: 29.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Electronic", "Vehicle"]
    },
    {
        _id: utilService.makeId(),
        name: "Futuristic Toy Robot",
        description: "A brightly colored toy robot with a modern and playful design.",
        price: 21.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Electronic", "Interactive"]
    },
    {
        _id: utilService.makeId(),
        name: "Magical Fairy Doll",
        description: "A fairy doll with delicate wings and enchanting details, perfect for fantasy play.",
        price: 16.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Fantasy", "Doll"]
    },
    {
        _id: utilService.makeId(),
        name: "Colorful Kite",
        description: "A vibrant kite soaring in the sky, symbolizing joy and outdoor play.",
        price: 13.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Outdoor", "Flight"]
    },
    {
        _id: utilService.makeId(),
        name: "Miniature Toy Car",
        description: "A miniature toy car with realistic details and a sleek design.",
        price: 7.99,
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        labels: ["Vehicle", "Collectible"]
    }
]
