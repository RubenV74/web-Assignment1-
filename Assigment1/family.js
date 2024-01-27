const fs = require("fs");

class FamilyService {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getAllFamilies() {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data).families;
  }

  getFamilyById(id) {
    const families = this.getAllFamilies();
    return families.find((family) => family.id === id);
  }

  getFamilyMembersById(id) {
    const family = this.getFamilyById(id);
    if (family) return family.members;
    else throw new Error("Family not found");
  }

  createFamily(newFamily) {
    const families = this.getAllFamilies();
    const maxId = Math.max(...families.map((family) => family.id), 0);
    newFamily.id = maxId + 1;
    families.push(newFamily);
    this.saveFamilies(families);
    return newFamily;
  }

  updateFamily(updatedFamily) {
    const families = this.getAllFamilies();
    const existingFamilyIndex = families.findIndex(
      (family) => family.id === updatedFamily.id
    );
    if (existingFamilyIndex !== -1) {
      families[existingFamilyIndex] = updatedFamily;
      this.saveFamilies(families);
      return updatedFamily;
    } else {
      throw new Error("Family not found");
    }
  }

  deleteFamily(id) {
    const families = this.getAllFamilies();
    const updatedFamilies = families.filter((family) => family.id !== id);
    if (updatedFamilies.length < families.length) {
      this.saveFamilies(updatedFamilies);
      return true;
    } else {
      throw new Error("Family not found");
    }
  }

  saveFamilies(families) {
    const data = JSON.stringify({ families }, null, 2);
    fs.writeFileSync(this.filePath, data, "utf-8");
  }
}

module.exports = FamilyService;
