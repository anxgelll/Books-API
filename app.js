
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for any new book you create

const express = require("express");
const app = express();
app.use(express.json());



app.get("/", (req, res) => res.send("Books API is running"));
app.get("/api/books", (req, res) => res.json(books));
app.get("/api/books/:id", (req, res) => {

    const id = Number(req.params.id) 

    const foundBooks = books.find((book) => book.id === id )

    if(!foundBooks){
        return res.sendStatus(404)
    }else{
        res.json(foundBooks)
    }

});

app.post("/api/books", (req, res) => {

    const {title, author, genre} = req.body

    //const nextId = books[books.length - 1].id + 1

    const newBook = {
        id: nextId, title: title, author: author, genre: genre
    }
    nextId++;

    books.push(newBook)

    res.status(201).send(newBook)

})

app.patch("/api/books/:id", (req, res) => {
    const id = Number(req.params.id) 

    for(let i = 0; i < books.length; i++){
        if(books[i].id === id){
            Object.assign(books[i], req.body)
            return res.status(200).send(books[i])
        }
    }
    return res.sendStatus(404)

})

app.delete("/api/books/:id", (req, res) => {
    const id = Number(req.params.id)

    if(!books.at(id)){
        return res.sendStatus(404)
    }

    const cleanedBooks = books.filter((book) => id !== book.id)
    books = cleanedBooks

    //books.splice(0, )


    res.sendStatus(204);
})




app.listen(8080, () => console.log("Server running on port 8080"));