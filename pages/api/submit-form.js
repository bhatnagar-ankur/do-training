export default function handler(req, res) {
    if (req.method === "POST") {
      const { name, email, phone, country } = req.body;
  
  
      console.log("Received Data:", { name, email, phone, country });
  
      return res.status(200).json({ message: "Form submitted successfully!" });
    }
  
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  