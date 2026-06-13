let currentExam = 'jee';

const examConfigs = {
    jee: { title: "JEE Main Analysis", maxMarks: 300 },
    neet: { title: "NEET Analysis", maxMarks: 720 },
    generic: { title: "General Entrance Exam", maxMarks: 100 }
};

function switchExam(exam) {
    currentExam = exam;
    
    // Update active tab UI
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update configurations
    document.getElementById('form-title').innerText = examConfigs[exam].title;
    document.getElementById('max-marks-info').innerText = `Out of ${examConfigs[exam].maxMarks}`;
    
    // Reset fields & hide results
    document.getElementById('user-marks').value = '';
    document.getElementById('user-percentile').value = '';
    document.getElementById('results').classList.add('hidden');
}

function toggleInputs() {
    const type = document.getElementById('input-type').value;
    if(type === 'marks') {
        document.getElementById('marks-group').classList.remove('hidden');
        document.getElementById('percentile-group').classList.add('hidden');
    } else {
        document.getElementById('marks-group').classList.add('hidden');
        document.getElementById('percentile-group').remove('hidden');
    }
}

function calculateData() {
    const inputType = document.getElementById('input-type').value;
    let rank, percentile, marks;
    
    if(currentExam === 'jee') {
        let totalCandidates = 1200000; // Estimated unique candidates
        if(inputType === 'marks') {
            marks = parseFloat(document.getElementById('user-marks').value) || 0;
            // Marks to percentile rough approximation
            if (marks >= 250) percentile = 99.9;
            else if (marks >= 200) percentile = 99.2;
            else if (marks >= 150) percentile = 98.0;
            else if (marks >= 120) percentile = 96.5;
            else if (marks >= 100) percentile = 93.0;
            else if (marks >= 70) percentile = 85.0;
            else percentile = 70.0;
        } else {
            percentile = parseFloat(document.getElementById('user-percentile').value) || 0;
            marks = Math.round((percentile / 100) * 300); // Inverse mock math
        }
        rank = Math.round(((100 - percentile) / 100) * totalCandidates);
        if(rank < 1) rank = 1;

        showResults(rank, percentile.toFixed(4) + "%", marks + "/300", "Top NITs/IIITs likely");

    } else if(currentExam === 'neet') {
        let totalNeetCandidates = 2400000;
        if(inputType === 'marks') {
            marks = parseFloat(document.getElementById('user-marks').value) || 0;
            if (marks >= 700) rank = Math.round(1 + (720-marks)*20);
            else if (marks >= 650) rank = Math.round(200 + (700-marks)*30);
            else if (marks >= 600) rank = Math.round(5000 + (650-marks)*200);
            else if (marks >= 500) rank = Math.round(30000 + (600-marks)*500);
            else rank = Math.round(120000 + (500-marks)*1000);
            
            percentile = ((totalNeetCandidates - rank) / totalNeetCandidates) * 100;
        } else {
            percentile = parseFloat(document.getElementById('user-percentile').value) || 0;
            rank = Math.round(((100 - percentile) / 100) * totalNeetCandidates);
            marks = Math.round(720 - (rank / 1000)); 
        }
        if(rank < 1) rank = 1;

        showResults(rank, percentile.toFixed(4) + "%", marks + "/720", marks >= 610 ? "AIIMS/Govt Medical College Likely" : "Private/Semi-Govt likely");
    } else {
        // Generic Exam Math
        marks = parseFloat(document.getElementById('user-marks').value) || 50;
        percentile = (marks / 100) * 100;
        rank = Math.round((100 - percentile) * 50);
        showResults(rank || 250, "92.40%", marks + "/100", "Qualifying Criteria Cleared");
    }
}

function showResults(rank, pct, score, tip) {
    document.getElementById('res-rank').innerText = `#${rank.toLocaleString()}`;
    document.getElementById('res-percentile').innerText = pct;
    document.getElementById('res-marks').innerText = score;
    document.getElementById('college-tip').innerText = tip;
    
    // Smooth appearance
    const resSection = document.getElementById('results');
    resSection.classList.remove('hidden');
}
