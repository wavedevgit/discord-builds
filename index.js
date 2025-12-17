import fs from "fs"

const URL = "https://canary.discord.com/app"

const res = await fetch(URL, {
    headers: {
        "user-agent": "Mozilla/5.0"
    }
})

if (!res.ok) {
    console.error("Failed to fetch HTML:", res.status)
    process.exit(1)
}

const html = await res.text()

const buildMatch = html.match(/BUILD_NUMBER:"(\d+)"/)
const hashMatch = html.match(/VERSION_HASH:"([a-f0-9]{40})"/)

if (!buildMatch || !hashMatch) {
    console.error("Failed to extract build info")
    process.exit(1)
}

const buildNumber = buildMatch[1]
const versionHash = hashMatch[1]

const fileName = `${buildNumber}.txt`

if (fs.existsSync(fileName)) {
    console.log("Build already saved:", buildNumber)
    process.exit(0)
}

fs.writeFileSync(fileName, versionHash + "\n")
fs.writeFileSync("latest.txt", buildNumber + ":" + versionHash)

console.log("Saved build", buildNumber, "with hash", versionHash)
