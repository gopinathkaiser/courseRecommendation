import agri from '../../data/allAgriculture.json'
import arch from '../../data/architecture_ranking.json'
import dental from '../../data/dental_ranking.json'
import engg from '../../data/engineering_ranking.json'
import law from '../../data/law_ranking.json'
import management from '../../data/management_ranking.json'
import medical from '../../data/medical_ranking.json'
import pharmacy from '../../data/pharmacy_ranking.json'
import research from '../../data/research_ranking.json'
import universities from '../../data/university_ranking.json'

const fileSelector = (option) => {
    console.log(option);
    switch(option){
        case 'agri': return agri;
        case 'arch': return arch;
        case 'dental': return dental;
        case 'engg': return engg;
        case 'law': return law;
        case 'management': return management;
        case 'medical': return medical;
        case 'pharmacy': return pharmacy;
        case 'research': return research;
        case 'universities': return universities;
        default: return agri
    }
    
}

export default fileSelector