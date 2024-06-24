function getTotalSize(uploadedFiles) {
    let sizes = uploadedFiles.map((file) => Number(file.size));
    const result = sizes.reduce((prev, next) => prev + next);
    return result;
}

const characters = [
    "iron-man",
    "captain-america",
    "thor",
    "black-widow",
    "spider-man",
    "hulk",
    "wolverine",
    "black-panther",
    "doctor-strange",
    "scarlet-witch",
    "falcon",
    "winter-soldier",
    "vision",
    "ant-man",
    "wasp",
    "captain-marvel",
    "deadpool",
    "venom",
    "daredevil",
    "elektra",
    "punisher",
    "blade",
    "ghost-rider",
    "loki",
    "thanos",
    "magneto",
    "professor-x",
    "cyclops",
    "jean-grey",
    "storm",
    "beast",
    "ice-man",
    "angel",
    "colossus",
    "rogue",
    "gambit",
    "mystique",
    "superman",
    "batman",
    "wonder-woman",
    "aquaman",
    "flash",
    "green-lantern",
    "cyborg",
    "shazam",
    "harley-quinn",
    "joker",
    "poison-ivy",
    "two-face",
    "riddler",
    "penguin",
    "scarecrow",
    "bane",
    "darkseid",
    "lex-luthor",
    "catwoman",
    "martian-manhunter",
];

function convertBytes(value) {
    const units = {
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
    };

    if (value === 0) return "0 Bytes";
    const bytes = value;
    const i = Math.floor(Math.log(bytes) / Math.log(units.KB));
    const formattedValue = (bytes / Math.pow(units.KB, i)).toFixed(1);

    const unit =
        i >= units.GB / units.KB ? "GB" : ["Bytes", "KB", "MB", "GB"][i];
    return formattedValue + " " + unit;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { getTotalSize, convertBytes, delay, characters };
