import { Agent, Emotions, KeywordParams } from "./typeUtils.ts"

export class Card {
    
    cardRepresentation: HTMLDivElement
    traitKeywordsElements: NodeList
    shuffleButton: HTMLDivElement
    editButton: HTMLDivElement
    doneButton: HTMLDivElement

    pageHeader: HTMLDivElement
    pageFooter: HTMLDivElement

//    anText: HTMLDivElement
    
    agentType: Agent
    keywords: [Emotions, Emotions, Emotions] = [null!, null!, null!]
    
    constructor(card: HTMLDivElement) {

        this.cardRepresentation = card
        this.traitKeywordsElements = this.cardRepresentation.querySelectorAll(".trait-keyword")
        this.shuffleButton = this.cardRepresentation.querySelector(".button.shuffle")!
        this.editButton = this.cardRepresentation.querySelector(".button.edit")!
        this.doneButton = this.cardRepresentation.querySelector(".button.done")!
        this.pageHeader = document.querySelector(".page.one .header")!
        this.pageFooter = document.querySelector(".page.one .footer")!


//        this.anText = this.cardRepresentation.querySelector(".an")!
        
        this.shuffleKeywords()
        
        let agentKey: keyof typeof Agent = card.id as keyof typeof Agent
        this.agentType = Agent[agentKey]
        
//        this.setCardText()
        
        this.traitKeywordsElements.forEach( node => {
            let keyword: HTMLDivElement = node as HTMLDivElement
            keyword.addEventListener("click", e => { this.toggleKeyword(e.target!) })
        })

        this.shuffleButton.addEventListener("click", this.shuffleKeywords.bind(this))
        this.editButton.addEventListener("click", this.openKeywordSelector.bind(this))
        this.doneButton.addEventListener("click", this.openKeywordSelector.bind(this))
        
    }

    shuffleKeywords() {
        
        this.keywords = [null!, null!, null!]
        const enumValues = Object.values(Emotions)
        
        for (let i = 0; i <= 2; i++) {
            const randomIndex = Math.floor(Math.random() * enumValues.length);
            const randomKeyword = enumValues[randomIndex]
            this.keywords[i] = Emotions[randomKeyword]
            
            // remove entry to prevent duplicates
            enumValues.splice(randomIndex, 1)
        }
        
        this.setCardText()
    }
    
    toggleKeyword(element: EventTarget) {

        let keywordLiteral: HTMLSpanElement = element as HTMLSpanElement
        const keywordEnumValue: Emotions = Emotions[keywordLiteral.innerText as keyof typeof Emotions]

        const index = this.keywords.indexOf(keywordEnumValue);
        if (index > -1) {
            // Remove keyword and add a random Emotion
            this.keywords.splice(index, 1);

            const enumValues = Object.values(Emotions)
            const randomIndex = Math.floor(Math.random() * enumValues.length);
            const randomKeyword = enumValues[randomIndex]
            this.keywords.push(randomKeyword)

        } else {
            // Remove a random item and add keywordLiteral
            const randomIndex = Math.floor(Math.random() * this.keywords.length);
            this.keywords.splice(randomIndex, 1);
            this.keywords.push(keywordEnumValue);
        }

        this.setCardText();

    }

    setCardText() {
        
        let elementsToSelect: HTMLDivElement[] = []
        let elementsToUnselect: HTMLDivElement[] =[]

        this.traitKeywordsElements.forEach( (node) => {
            
            let element: HTMLDivElement = node as HTMLDivElement
            let span: HTMLSpanElement = element.querySelector("span.keyword")!

            this.keywords.forEach( keyword => {
                if (span.innerText == keyword) { elementsToSelect.push(element) }
                else { elementsToUnselect.push(element) }
            })

        })

        elementsToUnselect.forEach(element => { element.classList.add("unselected") })
        elementsToSelect.forEach((element, index) => {
            element.classList.remove("unselected", "last")
            if (index == 2) { element.classList.add("last")}
        })

    }

    openKeywordSelector() {

        this.cardRepresentation.classList.toggle("edit")
        this.pageHeader.classList.toggle("minimized")
        this.pageFooter.classList.toggle("minimized")
    }

}