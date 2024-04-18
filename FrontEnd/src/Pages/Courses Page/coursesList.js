import { LuWheat } from "react-icons/lu";
import { MdArchitecture } from "react-icons/md";
import { FaSyringe } from "react-icons/fa";
import { FaPills } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { CiMedicalCross } from "react-icons/ci";
import { FaMicroscope } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";

const coursesList = [
    {
        icon: <LuWheat/>,
        name: 'Agricultural Engineering',
        route: 'agri'
    },
    {
        icon: <MdArchitecture/>,
        name: 'Architecture',
        route: 'arch'
    },
    {
        icon: <FaSyringe/>,
        name: 'Dental Science',
        route: 'dental'
    },
    {
        icon: <FaGear/>,
        name: 'Engineering',
        route: 'engg'
    },
    {
        icon: <GoLaw/>,
        name: 'Law',
        route: 'law'
    },
    {
        icon: <GrUserManager/>,
        name: 'Management',
        route: 'management'
    },
    {
        icon: <CiMedicalCross/>,
        name: 'Medical',
        route: 'medical'
    },
    {
        icon: <FaPills/>,
        name: 'Pharmacy',
        route: 'pharmacy'
    },
    {
        icon: <FaMicroscope/>,
        name: 'Research',
        route: 'r&d'
    },
    {
        icon: <FaUniversity/>,
        name: 'Universities',
        route: 'universities'
    }
]

export default coursesList