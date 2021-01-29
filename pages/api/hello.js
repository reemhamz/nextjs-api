// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const url = "https://jsonplaceholder.typicode.com/posts";

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
