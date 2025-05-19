# StarWars 👽

**StarWars** is a beginner-friendly app I built while learning React Native with Expo using galaxies.dev tutorial. It simplifies the process of exploring films, characters, and favorites from the saga, making the experience immersive and accessible to fans of all ages.

The app is organized into three simple and easy-to-use tabs:


|  🎬 All Films                                                                                                  | 🎬 Film Details                                                                                         |  ⭐ Favourites                                                                                                 | 👥 People                                                                                                  |  👤 Person Details                                                                                          |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| ![Films](https://github.com/user-attachments/assets/751ebf88-6c32-455a-95c2-1fac1dd4492e)              | ![Film Description](https://github.com/user-attachments/assets/98f8fc7a-73b5-4a0f-b97d-8ca1014b5f4d)      | ![Favorites](https://github.com/user-attachments/assets/9db56268-840b-4e3f-8205-a2140cc8fce7)             | ![People](https://github.com/user-attachments/assets/c53a8b6e-41e3-4d8e-bf8a-76dc347755d0)             | ![Person details](https://github.com/user-attachments/assets/07071aee-0b34-46dd-8fe6-d28b41ef9619)      |


---

## 🚀 Get started

1. **Clone the repository** from GitHub:

   ```bash
   git clone https://github.com/Ratnam12/star-wars
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the app**:

   ```bash
   npx expo
   ```

---

## 🔗 APIs Used

| Endpoint                                   | Usage                                                               |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `https://swapi.py4e.com/api/films/`        | Fetches the list of Star Wars films (`app/films/index.tsx`)         |
| `https://swapi.py4e.com/api/films/${id}/`  | Fetches details for a specific film (`app/films/[id].tsx`)          |
| `https://swapi.py4e.com/api/people`        | Fetches list of characters with pagination (`app/people/index.tsx`) |
| `https://swapi.py4e.com/api/people/${id}/` | Fetches character details (`app/people/[id].tsx`)                   |

---

## 🤝 Contributing

Have suggestions or spot a bug? Feel free to contribute!

1. Fork the repository
2. Make your changes
3. Submit a pull request

Please prefix your commits with a type:

```bash
feat: New feature
fix: Bug fix
style: UI improvements
test: Testing-related changes
docs: Documentation updates
refactor: Code refactoring
```
