// Conference Manager Script
// 1. Hoisting
// Calling the function before it is defined
main();

function main() {
    console.log("Conference Manager Started");

    // 2. Temporal Dead Zone (TDZ)
    try {
        console.log(conferenceName);
        let conferenceName = "Tech Conference 2026";
    } catch (error) {
        console.log("TDZ Error:", error.message);
    }

    // 3. Array & Object
    const speakers = [
        {
            name: "Virat kohli",
            fee: 1200
        },
        {
            name: "AB Devillers",
            fee: 1800
        },
        {
            name: "Jasprit Bumrah",
            fee: 1500
        }
    ];

    // Format speaker names using the DRY helper function
    const formattedSpeakers = speakers.map(speaker => ({
        ...speaker,
        name: formatName(speaker.name)
    }));

    // 4. Spread Operator
    // Add a surprise VIP speaker without changing the original array
    const vipSpeaker = {
        name: formatName("Asmi pandey"),
        fee: 5000
    };

    const allSpeakers = [...formattedSpeakers, vipSpeaker];

    console.log("\nConference Speakers");
    console.table(allSpeakers);

    // 5. Rest Parameter
    function calculateFees(...fees) {
        return fees.reduce((total, fee) => total + fee, 0);
    }

    const totalFees = calculateFees(
        ...allSpeakers.map(speaker => speaker.fee)
    );

    // 6. Number
    console.log("Total Speaking Fees: $" + totalFees);

    // 7. Date
    const today = new Date();
    const conferenceDate = new Date("2026-12-20");

    const timeDifference = conferenceDate - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    console.log("Days Until Conference:", daysLeft);

    // 8. Destructuring Array
    const [headliner1, headliner2] = allSpeakers;

    console.log("Headliner 1:", headliner1.name);
    console.log("Headliner 2:", headliner2.name);

    // 9. DRY Principle
    // formatName() is used multiple times so the formatting logic
    // is written only once.

    // 10. Debugging
    debugger;

    console.log("\nOriginal Speakers");
    console.table(speakers);

    console.log("Final Conference Speakers");
    console.table(allSpeakers);
}

// DRY Principle Helper Function
// Function declarations are hoisted, so it can be placed here.
function formatName(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
