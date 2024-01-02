import { utilService } from "../services/util.service.js"


export function getDefaultToys() {
    return JSON.parse(JSON.stringify(defaultToys))
}


const defaultToys = [
    {
        stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Snuggle Buddy Bear",
        description: "A charming plush teddy bear, perfect for cuddles, sitting on a gentle pastel-colored background.",
        price: 24.99,
        labels: ["plush", "teddy bear", "soft", "cuddly"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Hug-A-Bear",
        description: "An adorable, huggable teddy bear with a unique pastel backdrop, ideal for cozy moments.",
        price: 27.99,
        labels: ["plush", "teddy", "comfort", "pastel"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "BrightMind Puzzle",
        description: "A vibrant wooden puzzle featuring primary colors, designed to be both fun and educational for young minds.",
        price: 15.99,
        labels: ["puzzle", "wooden", "educational", "colorful"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "ColorQuest Puzzle",
        description: "An eye-catching, colorful wooden puzzle that promises hours of educational play with its bright primary hues.",
        price: 17.99,
        labels: ["puzzle", "bright", "learning", "wooden"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Adventure Hero Figure",
        description: "An action figure in a dynamic pose, set against an adventurous backdrop, inspiring heroic play.",
        price: 29.99,
        labels: ["action figure", "superhero", "dynamic", "adventure"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Epic Warrior Toy",
        description: "This superhero action figure, in an exciting pose, comes with an adventurous scene, sparking imaginative play.",
        price: 32.99,
        labels: ["action figure", "hero", "pose", "imagination"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Family Game Night Board",
        description: "A classic board game setup that brings the family together with its engaging pieces and game board.",
        price: 19.99,
        labels: ["board game", "family", "classic", "fun"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Together Time Board Game",
        description: "Experience the joy of family time with this classic board game, featuring a fun and interactive setup.",
        price: 21.99,
        labels: ["game", "family fun", "interactive", "board"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Zoomster RC Car",
        description: "A sleek, remote-controlled car that captures the thrilling experience of RC vehicles in action.",
        price: 35.99,
        labels: ["remote-controlled", "car", "excitement", "action"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "SpeedRacer Remote Car",
        description: "Experience high-speed fun with this remote-controlled car, showcasing its dynamic capabilities.",
        price: 38.99,
        labels: ["RC car", "sleek", "fun", "speed"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Dreamy Dollhouse",
        description: "A beautifully detailed dollhouse, complete with dolls, offering a world of charm and imaginative play.",
        price: 45.99,
        labels: ["dollhouse", "dolls", "detail", "imagination"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Fantasy Villa",
        description: "This exquisite dollhouse set includes dolls and intricate details, igniting the joy of imaginative storytelling.",
        price: 49.99,
        labels: ["dollhouse", "fantasy", "storytelling", "detailed"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Melody Makers",
        description: "A set of colorful, child-friendly musical instruments including a charming small guitar and a xylophone, perfect for young music enthusiasts.",
        price: 29.99,
        labels: ["musical instruments", "colorful", "children", "fun"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Little Virtuoso Set",
        description: "This engaging set features kid-friendly musical instruments like a playful guitar and a vibrant xylophone, inspiring musical creativity.",
        price: 31.99,
        labels: ["music", "kid-friendly", "guitar", "xylophone"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Backyard Adventure Set",
        description: "A collection of outdoor toys including a delightful swing set and a fun sandbox, perfect for capturing the essence of outdoor play.",
        price: 55.99,
        labels: ["outdoor toys", "swing set", "sandbox", "play"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Fun in the Sun Kit",
        description: "This set includes joyful outdoor toys like a sturdy swing set and a creative sandbox, bringing endless hours of outdoor fun.",
        price: 59.99,
        labels: ["outdoor", "joyful play", "swing", "sandbox"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Junior Explorer Science Kit",
        description: "An educational and fun science kit for young explorers, featuring interactive experiments that spark curiosity and learning.",
        price: 24.99,
        labels: ["science kit", "educational", "explorers", "interactive"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Discovery Lab Set",
        description: "This engaging science kit offers young explorers a hands-on experience with exciting and interactive scientific experiments.",
        price: 26.99,
        labels: ["science", "fun", "educational", "hands-on"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Imaginary Kingdom Costumes",
        description: "A collection of fantasy play costumes for dress-up, including princess, knight, and astronaut outfits, perfect for role-playing games.",
        price: 34.99,
        labels: ["costumes", "dress-up", "fantasy", "role-playing"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Adventure Dress-Up Set",
        description: "Featuring enchanting costumes like princesses, knights, and astronauts, this set invites children into a world of imaginative role-play.",
        price: 37.99,
        labels: ["role-play", "costumes", "fantasy", "kids"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Creative Constructors Set",
        description: "Colorful building blocks and LEGO sets that foster creativity and construction play, designed to captivate and engage young minds.",
        price: 42.99,
        labels: ["building blocks", "LEGO", "creative", "children"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Build & Play Blocks",
        description: "An alluring set of colorful building blocks and LEGO, perfect for encouraging creativity and constructive play in children.",
        price: 45.99,
        labels: ["LEGO sets", "building", "colorful", "play"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Techie Tot Toy",
        description: "An interactive electronic learning toy that combines fun with education, showcasing the best of technology-based play.",
        price: 29.99,
        labels: ["electronic", "learning", "interactive", "educational"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Smart Play Gadget",
        description: "This electronic learning toy engages and educates, blending fun with technology to offer a modern play experience.",
        price: 32.99,
        labels: ["interactive toy", "electronic", "fun", "smart"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Classic Spinner Yo-Yo",
        description: "A single, brightly colored yo-yo with an intricate pattern, embodying the timeless appeal and fun of this classic toy.",
        price: 9.99,
        labels: ["yo-yo", "colorful", "classic", "intricate pattern"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Retro Magic Yo-Yo",
        description: "A single, brightly colored yo-yo with an elaborate pattern, harking back to the classic charm of this beloved toy.",
        price: 10.99,
        labels: ["yo-yo", "bright", "classic", "intricate"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Heritage Wooden Train",
        description: "A beautifully crafted wooden train toy, exemplifying classic craftsmanship and a timeless design ideal for collectors.",
        price: 39.99,
        labels: ["wooden toy", "train", "craftsmanship", "classic"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Timeless Locomotive",
        description: "This exquisitely crafted wooden train represents the pinnacle of traditional toy making, showcasing elegance and history.",
        price: 42.99,
        labels: ["wooden", "train", "detailed", "timeless"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Splashy the Rubber Duck",
        description: "A vibrant, colorful rubber duck designed to bring joy and fun to bath time, with a playful and engaging look.",
        price: 7.99,
        labels: ["rubber duck", "colorful", "bath toy", "playful"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Rainbow Duckie",
        description: "This cheerful, brightly colored rubber duck adds a touch of fun to any bath, captivating with its vibrant hues.",
        price: 8.99,
        labels: ["rubber duck", "vibrant", "fun", "bath time"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Sky High Model Airplane",
        description: "A detailed model airplane showcasing meticulous design and lifelike realism, perfect for aviation enthusiasts and collectors.",
        price: 55.99,
        labels: ["model airplane", "detailed", "realism", "collectors"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Aviator's Dream",
        description: "An intricately designed model airplane that captures the essence of aviation with its realism and attention to detail.",
        price: 58.99,
        labels: ["airplane model", "intricate", "realistic", "enthusiasts"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Collector's Edition Plane",
        description: "A single, expertly detailed model airplane, offering an unmatched level of realism, ideal for discerning collectors.",
        price: 62.99,
        labels: ["model airplane", "collector", "detailed", "realistic"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "FuturoBot Toy",
        description: "A brightly colored toy robot with a futuristic design, blending modern elements with playful charm.",
        price: 29.99,
        labels: ["robot", "colorful", "futuristic", "playful"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "RoboPlaymate",
        description: "This toy robot, adorned in vivid colors, showcases a modern, futuristic design, sparking imagination and play.",
        price: 31.99,
        labels: ["toy robot", "bright", "modern", "interactive"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Enchanted Fairy Doll",
        description: "A magical fairy doll with delicate wings and enchanting details, embodying the whimsical world of fantasy toys.",
        price: 24.99,
        labels: ["fairy doll", "magical", "wings", "fantasy"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Whimsy Winged Fairy",
        description: "This fairy doll captivates with its delicate wings and detailed design, bringing the magic of fairytales to life.",
        price: 26.99,
        labels: ["fairy", "delicate", "enchanted", "whimsical"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Sky Dancer Kite",
        description: "A single, colorful kite with a vibrant design, embodying the joy and freedom of outdoor play as it soars in the sky.",
        price: 17.99,
        labels: ["kite", "colorful", "outdoor", "joy"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Rainbow Flyer",
        description: "This eye-catching kite features a dynamic, colorful design, perfect for sunny days and outdoor adventures.",
        price: 19.99,
        labels: ["colorful kite", "vibrant", "outdoor fun", "soaring"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Mini Racer Pro",
        description: "A miniature toy car boasting realistic details and a sleek, modern design, capturing the thrill of miniature vehicle collectibles.",
        price: 14.99,
        labels: ["miniature car", "realistic", "sleek", "vehicle"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Speedster Mini Car",
        description: "This single, miniature toy car features intricate details and a streamlined design, perfect for enthusiasts of small-scale vehicles.",
        price: 16.99,
        labels: ["toy car", "miniature", "detailed", "collectible"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Mystic Unicorn Plush",
        description: "A whimsical unicorn plush toy, adorned with vibrant colors and soft textures, perfect for cuddles and imaginative play.",
        price: 22.99,
        labels: ["unicorn", "plush", "vibrant", "soft"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Rainbow Unicorn Toy",
        description: "This enchanting unicorn plush toy features a rainbow of colors and a delightfully soft texture, ideal for imaginative adventures.",
        price: 24.99,
        labels: ["unicorn plush", "whimsical", "colorful", "cuddly"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Brainy Cube Puzzle",
        description: "An intricate puzzle cube that presents a colorful and challenging brain teaser for puzzle enthusiasts of all ages.",
        price: 12.99,
        labels: ["puzzle cube", "intricate", "brain teaser", "colorful"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Color Twist Cube",
        description: "This single, complex puzzle cube offers a vibrant and engaging challenge, perfect for sharpening the mind.",
        price: 14.99,
        labels: ["puzzle", "colorful", "challenging", "mind game"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Panda Snuggle Pillow",
        description: "A soft and fluffy animal-shaped pillow designed as a cute panda, perfect for comfortable cuddles and decor.",
        price: 18.99,
        labels: ["pillow", "animal-shaped", "panda", "fluffy"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Cuddly Panda Pal",
        description: "This adorable, fluffy pillow shaped like a friendly panda offers a cozy and cute addition to any room.",
        price: 20.99,
        labels: ["panda pillow", "soft", "cuddly", "animal design"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Electro Train Express",
        description: "A single, electronic toy train with vibrant colors and realistic details, offering a modern twist on the classic train toy.",
        price: 35.99,
        labels: ["electronic train", "realistic", "vibrant", "modern"]
    },
    {
		stock: Math.max(utilService.getRandInt(16, -4), 0),
        name: "Vivid Locomotive",
        description: "This electronic toy train combines realistic detailing with bright, eye-catching colors, reinventing the classic train toy experience.",
        price: 38.99,
        labels: ["toy train", "electronic", "detailed", "colorful"]
    }
]
