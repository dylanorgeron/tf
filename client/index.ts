async function helloApi() {
    try {
        const res = await fetch('/api')
        const text = await res.text()

        alert(text)
    } catch (e) {
        alert(e)
    }
}

helloApi()