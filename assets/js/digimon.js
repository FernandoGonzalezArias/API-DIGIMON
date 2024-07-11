document.addEventListener('DOMContentLoaded', () => {
    const digimonSelect = document.getElementById('digimonSelect');
    const digimonInfoDiv = document.getElementById('digimonDetail');
    const audioPlayer = document.getElementById('audio-player');
    const btnPlay = document.getElementById('btn-play');
    const btnPause = document.getElementById('btn-pause');
    const volumeControl = document.getElementById('volume-control');

    // Function to fetch Digimon data by name
    const fetchDigimonByName = async (name) => {
        try {
            const response = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
            const data = await response.json();
            if (data.length > 0) {
                const digimon = data[0];
                digimonInfoDiv.innerHTML = `
                    <h3>${digimon.name}</h3>
                    <img src="${digimon.img}" alt="${digimon.name}">
                    <p><strong>Level:</strong> ${digimon.level}</p>
                    <p><strong>Type:</strong> ${digimon.type}</p>
                    <p><strong>Attribute:</strong> ${digimon.attribute}</p>
                    <p><strong>Memory Usage:</strong> ${digimon.memoryUsage}</p>
                `;
            } else {
                digimonInfoDiv.innerHTML = '<p>Digimon not found. Please try another name.</p>';
            }
        } catch (error) {
            console.error('Error fetching Digimon:', error);
        }
    };

    // Function to play the audio
    const playAudio = () => {
        audioPlayer.play();
    };

    // Function to pause the audio
    const pauseAudio = () => {
        audioPlayer.pause();
    };

    // Event listener for play button
    btnPlay.addEventListener('click', playAudio);

    // Event listener for pause button
    btnPause.addEventListener('click', pauseAudio);

    // Event listener for volume control
    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value;
    });

    // Fetch and display all Digimon names on page load
    const fetchAllDigimonNames = async () => {
        try {
            const response = await fetch('https://digimon-api.vercel.app/api/digimon');
            const data = await response.json();
            digimonSelect.innerHTML = data.map(digimon => `<option>${digimon.name}</option>`).join('');
        } catch (error) {
            console.error('Error fetching Digimon list:', error);
        }
    };

    // Event listener for select option change
    digimonSelect.addEventListener('change', () => {
        const selectedDigimon = digimonSelect.value;
        fetchDigimonByName(selectedDigimon);
    });

    fetchAllDigimonNames();
});
