exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content");
}

exports.laboratoryStaff = (req, res) => {
    res.status(200).send("Laboratory staff content");
}

exports.doctorBoard = (req, res) => {
    res.status(200).send("Doctor content");
}
