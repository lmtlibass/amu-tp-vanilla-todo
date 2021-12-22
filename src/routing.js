
/**
 * Appelle la fonction correspondante à une URL donnée
 * @param {string} url 
 */
 export const applyRouting = (url) => {
    let params;

    // Si l'URL ressemble à /12/details
    if (params = url.match(/^\/(\d+)\/details$/)) {
        // On cherche à afficher le détail d'une tâche
        const id = +params[1];

        console.log("J'affiche la tâche n°" + id);
        return;
    }
    // Dans tous les autres cas, on présente la liste des tâches
    console.log("J'affiche la liste des tâches");
}