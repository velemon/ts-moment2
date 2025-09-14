# Moment 2 - Objektorienterad programmering

**Denna uppgift handlar om att skapa en applikation i Typescript där man ska kunna lägga till uppgifter och markera som klara, detta ska sparas mellan sidvisningar i local storage.**

##Skapa projekt
Först använde jag Vite och VSCode för att skapa ett automatiserat projekt och ha en utvecklingsmiljö och server där jag hela tiden kan följa automatiserade uppdateringar. Vite transpilerar koden till Javascript. Projektet kopplades även ihop med Git för att versionshanteras på GitHub och sedan publikt visas på Netlify.

##HTML-kod och CSS
Jag började med att konstruera html och stil på webbsidan för att kunna se vad som händer. Jag gjorde en form där information ska skrivas in och sedan en tom UL lista där Todos sedan skulle hamna. Med CSS skapade jag styling och responsivitet:
Flexbox används i en container för layout och media queries gör att formuläret samt listan ändrar layout på mindre skärmar.

Dessa saker skulle finnas med på webbplatsen:
 - Ett formulär för att lägga till nya todos med textfält för uppgift och prioritet.
- Ett område för att visa en lista över alla todos.
- En knapp för att markera todos som klara (gjordes dock med Typescript).
- Webbplatsen skall vara någorlunda snygg och prydlig och fungera väl på stora som små skärmar med bra responsiv design.

##Typescript-kod

### Interface
Till att börja med skapade jag ett interface för alla egenskaper som ska finnas i en Todo:

- task: texten för uppgiften
- completed: boolean som visar om uppgiften är klar eller inte
- priority: heltal 1–3, där 1 = viktigast och 2 = minst viktigt
- createdAt: datum då todo skapades
- completedAt?: datum då todo markeras som klar (valfri då det inte finns ett slutdatum för uppgiften vid skapandet av den)

Då det var krav på utökad funktionalitet så lades datumen till.

###Klass
Sedan skapade jag klassen TodoList för att hantera all logik kring todo-listan.

class TodoList {
    todos: Todo[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean { ... }
    markTodoCompleted(index: number): void { ... }
    removeTodo(index: number): void { ... }
    getTodos(): Todo[] { ... }
    saveToLocalStorage(): void { ... }
    loadFromLocalStorage(): void { ... }
}

**todos: Todo[] = [];**
- Todos lagras som objekt i en array

**constructor():**
- Initierar todos-arrayen
- Laddar tidigare sparade todos från LocalStorage

**addTodo(task, priority)**
- Validerar inmatade värden om de är korrekta eller ej
- Skapar ett nytt Todo-objekt med createdAt
- Lagrar listan i LocalStorage
- Returnerar true om todo läggs till, annars false

**markTodoCompleted(index)**
- Markerar vald todo som klar
- Sparar tidpunkt i completedAt
- Uppdaterar LocalStorage

**removeTodo(index)**
- Tar bort vald todo från listan
- Uppdaterar LocalStorage

**getTodos()**
- Returnerar hela todo-listan

**saveToLocalStorage() / loadFromLocalStorage()**
- Hanterar lagring i webbläsaren så att listan finns kvar vid uppdatering

###DOM och UI
Hämtar element från DOM med typade element (HTMLFormElement, HTMLInputElement, HTMLUListElement) och skapar nya element med nya värden från formuläret in i UL listan och skriver ut detta till DOM så uppgifterna syns på webbsidan.

###Formulär
För formulärshantering så använde jag en händelselyssnare för att vid submit av formuläret så ska värdena först kontrolleras om de är korrekta, är de fel så ska en varning poppa upp annars skickas värdena in i listan. Efter det rensas formuläret och listan laddas om.

##README
Slutligen skrev jag denna README fil för att det var ett av kraven och här beskriver jag hur jag löste denna uppgift.