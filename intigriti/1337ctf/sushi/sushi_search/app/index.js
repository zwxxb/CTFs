const fastify = require("fastify")();
const createDOMPurify = require("dompurify");
const ejs = require("ejs");
const path = require("path");
const formbody = require("@fastify/formbody");
const { JSDOM } = require("jsdom");
const { visit } = require("./bot");
const port = 80;
const host = "0.0.0.0";

const items = [
    {
        title: "Nigiri",
        description: "A classic sushi made with a slice of raw fish on top of vinegared rice.",
        price: 5.0,
    },
    {
        title: "Maki Roll",
        description:
            "A sushi roll with seaweed on the outside and rice, fish, and vegetables inside.",
        price: 6.5,
    },
    { title: "Sashimi", description: "Thin slices of raw fish served without rice.", price: 8.0 },
    {
        title: "Temaki",
        description: "A hand-rolled sushi cone filled with rice, fish, and vegetables.",
        price: 7.0,
    },
    {
        title: "California Roll",
        description:
            "A popular sushi roll made with crab, avocado, cucumber, and rice, often with sesame seeds.",
        price: 6.0,
    },
    {
        title: "Ebi Tempura Roll",
        description: "A sushi roll with tempura-fried shrimp, cucumber, and avocado.",
        price: 7.5,
    },
    {
        title: "Dragon Roll",
        description: "A sushi roll with eel, cucumber, and avocado, topped with unagi sauce.",
        price: 9.0,
    },
    {
        title: "Spicy Tuna Roll",
        description: "A sushi roll with spicy tuna, cucumber, and sesame seeds.",
        price: 6.5,
    },
    {
        title: "Unagi Nigiri",
        description:
            "Grilled eel served on top of vinegared rice with a drizzle of sweet unagi sauce.",
        price: 7.0,
    },
    {
        title: "Rainbow Roll",
        description: "A colorful sushi roll topped with a variety of raw fish and avocado.",
        price: 10.0,
    },
];

// Register middleware
fastify.register(formbody);

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: ejs,
    },
});

fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
    prefix: "/public/",
});

// Routes
fastify.get("/", async (req, reply) => {
    const resp = await ejs.renderFile(path.resolve(__dirname, "views", "index.ejs"));
    reply.type("text/html").send(resp);
});

fastify.get("/search", async (req, reply) => {
    const query = req.query.search || "";

    const matchedItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
    );

    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);
    const cleanQuery = DOMPurify.sanitize(query);

    const resp = await ejs.renderFile(path.resolve(__dirname, "views", "result.ejs"), {
        message: cleanQuery,
        items: matchedItems,
    });
    reply.type("text/html").send(resp);
});

fastify.get("/report", async (req, reply) => {
    const resp = await ejs.renderFile(path.resolve(__dirname, "views", "report.ejs"), {
        message: "",
    });
    reply.type("text/html").send(resp);
});

fastify.post("/report", async (req, reply) => {
    const { url } = req.body;
    let message;

    try {
        message = await visit(url);
    } catch (error) {
        message = error.message;
    }
    const resp = await ejs.renderFile(path.resolve(__dirname, "views", "report.ejs"), { message });
    reply.type("text/html").send(resp);
});

fastify.setErrorHandler(function (error, request, reply) {
    console.error("Error occurred:", error);
    reply.status(500).send({ error: "Something went wrong. Please try again later." });
});

fastify.listen({ port, host }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Fastify app listening at ${address}`);
});
