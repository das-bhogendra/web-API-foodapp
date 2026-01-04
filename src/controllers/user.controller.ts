import { Request, Response } from 'express';
import { z } from 'zod';


export const UserSchema = z.object({
    id: z.string().min(1, { message: "User ID is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    age: z.number().optional(),
});

export type User = z.infer<typeof UserSchema>;

// DTO
export const CreateUserDTOSchema = UserSchema.pick({
    id: true,
    username: true,
    email: true,
    name: true
});
export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;


let users: User[] = [
    { id: "user1", username: "john_doe", email: "john@example.com", name: "John Doe", age: 30 },
    { id: "user2", username: "jane_smith", email: "jane@example.com", name: "Jane Smith", age: 25 }
];

// Controller
export class UserController {

    // CREATE user
    createUser = (req: Request, res: Response) => {
        try {
            const validation = CreateUserDTOSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({ errors: validation.error });
            }

            const { id, username, email, name } = validation.data;

            // Unique validations
            if (users.find(u => u.id === id)) {
                return res.status(409).json({ message: "User ID already exists" });
            }
            if (users.find(u => u.email === email)) {
                return res.status(409).json({ message: "Email already exists" });
            }
            if (users.find(u => u.username === username)) {
                return res.status(409).json({ message: "Username already exists" });
            }

            const newUser: User = {
                id,
                username,
                email,
                name,
                age: req.body.age ?? null
            };

            users.push(newUser);

            return res.status(201).json(newUser);

        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error
            });
        }
    };

    
    getUsers = (req: Request, res: Response) => {
        try {
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error
            });
        }
    };

    
    getUserById = (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const user = users.find(u => u.id === id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);

        } catch (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    
    updateUser = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { username, email, name, age } = req.body;

            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" });
            }

            // Required fields validation
            if (!username || !email || !name) {
                return res.status(400).json({ message: "Username, email, and name are required" });
            }

            // Unique checks
            if (users.find(u => u.email === email && u.id !== id)) {
                return res.status(409).json({ message: "Email already exists" });
            }

            if (users.find(u => u.username === username && u.id !== id)) {
                return res.status(409).json({ message: "Username already exists" });
            }

            users[userIndex] = {
                id,
                username,
                email,
                name,
                age: age ?? users[userIndex].age
            };

            return res.status(200).json(users[userIndex]);

        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // DELETE user
    deleteUser = (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" });
            }

            users.splice(userIndex, 1);

            return res.status(204).send();

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

