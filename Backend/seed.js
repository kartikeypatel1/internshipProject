import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const books = [
    // ── FREE BOOKS ─────────────────────────────────────────────────────
    {
        name: "The Great Gatsby",
        title: "A timeless tale of ambition, love, and the American Dream set in the Jazz Age.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    },
    {
        name: "Pride and Prejudice",
        title: "Jane Austen's beloved classic exploring manners, marriage, and morality in 19th-century England.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8739867-L.jpg",
    },
    {
        name: "1984",
        title: "George Orwell's chilling dystopian vision of a totalitarian society under constant surveillance.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8575708-L.jpg",
    },
    {
        name: "Dracula",
        title: "Bram Stoker's iconic gothic horror novel about the notorious vampire Count Dracula.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8406786-L.jpg",
    },
    {
        name: "Moby-Dick",
        title: "Herman Melville's epic tale of obsession, adventure, and the clash between man and nature.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8227609-L.jpg",
    },
    {
        name: "Adventures of Huckleberry Finn",
        title: "Mark Twain's classic coming-of-age story about friendship and freedom along the Mississippi River.",
        price: 0,
        category: "Free",
        image: "https://covers.openlibrary.org/b/id/8739164-L.jpg",
    },

    // ── PAID BOOKS ─────────────────────────────────────────────────────
    {
        name: "Clean Code",
        title: "Robert C. Martin's guide to writing readable, maintainable, and elegant code every developer must read.",
        price: 29,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    },
    {
        name: "The Pragmatic Programmer",
        title: "Dave Thomas & Andy Hunt's classic on craftsmanship, adaptability, and building better software.",
        price: 34,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    },
    {
        name: "Atomic Habits",
        title: "James Clear's proven framework for building good habits and breaking bad ones through tiny changes.",
        price: 15,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/10318608-L.jpg",
    },
    {
        name: "Deep Work",
        title: "Cal Newport's rules for achieving focused success in a distracted world through deliberate practice.",
        price: 14,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    },
    {
        name: "Sapiens",
        title: "Yuval Noah Harari's sweeping history of humankind from the Stone Age to the 21st century.",
        price: 19,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/10295088-L.jpg",
    },
    {
        name: "The Lean Startup",
        title: "Eric Ries' methodology for building companies and launching products with maximum efficiency.",
        price: 22,
        category: "Paid",
        image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MongoDBURI);
        console.log("✅ Connected to MongoDB");

        // Clear existing books
        await Book.deleteMany({});
        console.log("🗑️  Cleared existing books");

        // Insert seed data
        await Book.insertMany(books);
        console.log(`📚 Seeded ${books.length} books successfully!`);

        await mongoose.disconnect();
        console.log("✅ Done. Database disconnected.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};

seed();
