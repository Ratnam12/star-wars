# StarWars 👽

StarWars is a beginner-friendly app I built while learning React Native with Expo. It simplifies the process of exploring films, characters, and favorites from the saga, making the experience immersive and accessible to fans of all ages.
The app is organized into three simple and easy-to-use tabs:

🎬 Films Tab ("All Films")
Here you can scroll through the complete list of Star Wars movies. Just tap on a film to see details like the opening crawl, who directed and produced it, when it was released, and which characters appear in it.

⭐ Favourites Tab ("All Favourites")
This section is for your personal favorites. You can save the films you like, and they’ll show up here — so you can easily come back to them anytime.

👤 People Tab ("All People")
This tab lets you explore the different characters from the Star Wars universe. You’ll find a list of names, and when you tap on one, you’ll get more info like their height, mass, hair color, where they’re from, and which films they were in.

## Get started

1. Clone the repository from GitHub:

   ```bash
   https://github.com/Ratnam12/star-wars
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Start the App

   ```bash
   npx expo
   ```

## 🔗 APIs Used

1. https://swapi.py4e.com/api/films/:

  - Used in `app/films/index.tsx` to fetch the list of Star Wars films.

2. https://swapi.py4e.com/api/films/${id}/:
   
  - Used in `app/films/[id].tsx` to fetch details for a specific film using its ID.

3. https://swapi.py4e.com/api/people:
   
  - Used in `app/people/index.tsx` to fetch the list of Star Wars characters.
  - It also handles pagination using the next URL provided by the API response.

4. https://swapi.py4e.com/api/people/${id}/:
   
  - Used in `app/people/[id].tsx` to fetch details for a specific character using their ID.


 ## 🔗 Contributing:
Contribution to the project can be made if you have some improvements for the project or if you find some bugs.

You can contribute to the project by reporting issues, forking it, modifying the code and making a pull request to the repository.

Please make sure you specify the commit type when opening pull requests:

```bash
feat: The new feature you're proposing

fix: A bug fix in the project

style: Feature and updates related to UI improvements and styling

test: Everything related to testing

docs: Everything related to documentation

refactor: Regular code refactoring and maintenance
```
