const http = require("http");
const url = require("url");
const FamilyService = require("./family");

const familyService = new FamilyService("./family.json");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  switch (req.method) {
    case "GET":
      if (pathname === "/") {
        res.end("top");
      } else if (pathname === "/families") {
        // קבלת רשימת כל המשפחות
        const families = familyService.getAllFamilies();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(families));
      } else if (pathname.startsWith("/families/")) {
        // קבלת פרטי משפחה לפי זיהוי
        const familyId = parseInt(pathname.split("/")[2]);
        const hasMembersParams = pathname.split("/")[3] === "members";
        const family = familyService.getFamilyById(familyId);
        if (hasMembersParams) {
          try {
            const familyMembers = familyService.getFamilyMembersById(familyId);
            res.end(JSON.stringify(familyMembers));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end(error.message);
          }
        } else if (family) {
          try {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(family));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end(error.message);
          }
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Family not found" }));
        }
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      break;

    case "POST":
      if (pathname === "/families") {
        // יצירת משפחה חדשה
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          const newFamily = JSON.parse(body);
          const createdFamily = familyService.createFamily(newFamily);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(createdFamily));
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      break;

    case "PUT":
      if (pathname.startsWith("/families/")) {
        // עדכון פרטי משפחה לפי זיהוי
        const familyId = parseInt(pathname.split("/")[2]);
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          const updatedFamily = JSON.parse(body);
          updatedFamily.id = familyId; // הבאת הזיהוי לתוך העדכון
          try {
            const result = familyService.updateFamily(updatedFamily);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end(error.message);
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      break;

    case "DELETE":
      if (pathname.startsWith("/families/")) {
        // מחיקת משפחה לפי זיהוי
        const familyId = parseInt(pathname.split("/")[2]);
        try {
          const result = familyService.deleteFamily(familyId);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: result }));
        } catch (error) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end(error.message);
        }
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
