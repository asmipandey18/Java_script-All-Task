// ===========================================
// Conference Manager Script
// ===========================================

// 1. Hoisting
// Calling the function before it is defined.
main();

// Main Function
function main() {
    console.log("Conference Manager Started");

    // 2. Temporal Dead Zone (TDZ)
    // Intentionally triggering a TDZ ReferenceError
    try {
        console.log(conferenceName);
        let conferenceName = "Tech Conference 2026";
    } catch (error) {
        console.log("TDZ Error:", error.message);
    }

    // 3. Array & Object
    // Array of speaker objects
    const speakers = [
        {
            name: "virat kohli",
            fee: 1200
        },
        {
            name: "ab de villiers",
            fee: 1800
        },
        {
            name: "jasprit bumrah",
            fee: 1500
        }
    ];

    // Format speaker names using the DRY helper function
    const formattedSpeakers = speakers.map(speaker => ({
        ...speaker,
        name: formatName(speaker.name)
    }));

    // 4. Spread Operator
    // Add a surprise VIP speaker without mutating the original array
    const vipSpeaker = {
        name: formatName("asmi pandey"),
        fee: 5000
    };

    const allSpeakers = [...formattedSpeakers, vipSpeaker];

    console.log("\nConference Speakers:");
    console.table(allSpeakers);

    // 5. Rest Parameter
    // Function accepts any number of fees
    function calculateFees(...fees) {
        return fees.reduce((total, fee) => total + fee, 0);
    }

    const totalFees = calculateFees(
        ...allSpeakers.map(speaker => speaker.fee)
    );

    // 6. Number
    // Format total fees to two decimal places
    console.log("Total Speaking Fees: $" + totalFees.toFixed(2));

    // 7. Date
    // Calculate days until conference
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
    // formatName() helper function is used multiple times
    // to avoid repeating the same name-formatting logic.

    // 10. Debugging
    debugger;

    console.log("\nOriginal Speakers:");
    console.table(speakers);

    console.log("Final Conference Speakers:");
    console.table(allSpeakers);
}

// DRY Principle Helper Function
// Function declarations are hoisted
function formatName(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}