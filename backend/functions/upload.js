export default (req, res) =>{
    try{
        let arrLink = []
        req.files.forEach(e=>{arrLink.push(`/uploads/${e.filename}`)})
        res.json({ message: "Successfully uploaded files", url:arrLink});
    }
    catch (err){
        res.status(500).json({massage:'Error with load files'},err)
    }
}
