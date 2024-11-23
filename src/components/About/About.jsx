
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <h1 className="about__title">ABOUT</h1>
      <div className="about__text">
        <p className="about__text-content">
          Welcome to the Pokémon app! Designed to help not only new Pokemon
          Trainers, but also the ones that have been through all kinds of
          battles.
        </p>

        <p className="about__text-content">
          Here youll find all the Pokemons by their Pokedex number, and also
          their types and all their available moves and at which level are they
          able to learned them.
        </p>

        <p className="about__text-content">
          Dont know the Pokemon name you are looking for? dont worry scroll
          through the pokedex list and youll be able to spot him and finally
          learn important stuff about it ~ Gym Leader Sida
        </p>
      </div>
    </section>
  );
}

export default About;
