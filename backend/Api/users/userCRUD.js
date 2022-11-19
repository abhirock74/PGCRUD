const Users = require('../../models/users');
module.exports = {
    findAll: async (req, res) => {
        try {
            let user = await Users.findAll();
            return res.status(200).json({ message: "user List", user: user })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    create: async (req, res) => {
        try {
            let { name, username, password, email, role } = req.body;
            if (username && name && password && email && role) {
                let user = await Users.findOne({ where: { username: username } });
                if (user) {
                    return res.status(200).json({ message: "user Already Exists" })
                } else {
                    let user = await Users.create({ username, name, password, email, role });
                    return res.status(200).json({ message: "user create Successful", user: user })
                }
            } else {
                return res.status(200).json({ message: "All field are required" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            id = req.params.id;
            const user = await Users.update(req.body, { where: { id: id } });
            return res.status(200).json({ message: "user update", user })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            id = req.params.id;
            const user = await Users.destroy({ where: { id: id } });
            return res.status(200).json({ message: "user deleted", user })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

};