const search = async ({type, value}) => {
    const website = new URL("http://www.iconexlog.com.br/consulta/")

    website.searchParams.append("type", type)
    website.searchParams.append("value", value)

    chrome.tabs.create({ url: website.href })
}

const onInstalled = () => {
    const types = [
        {
            id: 'nfe',
            name: "NFe"
        },
        {
            id: 'cte',
            name: "CTe"
        },
        {
            id: 'pedido',
            name: "Pedido"
        },
        {
            id: 'cpf',
            name: "CPF/CNPJ"
        },
    ];
    
    for (const type of types) {
        const title = `Buscar ${type.name} em iConex Logistica`
        chrome.contextMenus.create({ title, contexts: ['selection'], id: type.id })
    }
}

const contextMenus = (data, tab) => {
    search({
        type: data.menuItemId,
        value: data.selectionText
    })
}

chrome.contextMenus.onClicked.addListener(contextMenus)
chrome.runtime.onInstalled.addListener(onInstalled)