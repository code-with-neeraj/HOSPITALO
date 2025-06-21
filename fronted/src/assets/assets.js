import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Kumar',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rajesh Kumar is a dedicated General Physician with a passion for preventive medicine and holistic patient care. He is committed to early diagnosis and effective treatment strategies, ensuring his patients receive comprehensive and compassionate healthcare.',
        fees: 50,
        address: {
            line1: '221B Baker Street',
            line2: 'Marylebone, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Priya Sharma',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Priya Sharma is a skilled Gynecologist focused on women’s health and wellness. She provides personalized care, emphasizing preventive screenings and patient education to empower women at every stage of life.',
        fees: 60,
        address: {
            line1: '10 Downing Street',
            line2: 'Westminster, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sneha Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sneha Patel specializes in dermatology, offering expert diagnosis and treatment for a wide range of skin conditions. She is dedicated to helping patients achieve healthy, radiant skin through evidence-based care.',
        fees: 30,
        address: {
            line1: '1600 Pennsylvania Ave',
            line2: 'NW, Washington DC'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Arjun Mehta',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Arjun Mehta is a caring Pediatrician committed to the health and development of children. He provides attentive and friendly care, supporting families with preventive guidance and effective treatments.',
        fees: 40,
        address: {
            line1: '742 Evergreen Terrace',
            line2: 'Springfield'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Anjali Gupta',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Anjali Gupta is an experienced Neurologist with expertise in diagnosing and managing neurological disorders. She is dedicated to improving patient outcomes through compassionate care and advanced therapies.',
        fees: 50,
        address: {
            line1: '12 Grimmauld Place',
            line2: 'Islington, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Vikram Singh',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Vikram Singh provides comprehensive neurological care, focusing on patient education and individualized treatment plans. He is committed to helping patients manage complex neurological conditions.',
        fees: 50,
        address: {
            line1: '4 Privet Drive',
            line2: 'Little Whinging, Surrey'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Aarav Sharma',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Aarav Sharma is a trusted General Physician known for his thorough approach to patient care. He emphasizes preventive health and works closely with patients to promote long-term wellness.',
        fees: 50,
        address: {
            line1: '221A Baker Street',
            line2: 'Marylebone, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Rohan Verma',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rohan Verma is a compassionate Gynecologist dedicated to providing high-quality care for women. He focuses on preventive health, reproductive wellness, and patient-centered treatment.',
        fees: 60,
        address: {
            line1: '221C Baker Street',
            line2: 'Marylebone, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Kavya Nair',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Kavya Nair is a Dermatologist passionate about skin health and cosmetic dermatology. She offers personalized care and modern treatments to help patients look and feel their best.',
        fees: 30,
        address: {
            line1: '31 Spooner Street',
            line2: 'Quahog, Rhode Island'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Siddharth Joshi',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Siddharth Joshi is a dedicated Pediatrician who provides comprehensive care for children of all ages. He is committed to supporting families and promoting healthy childhood development.',
        fees: 40,
        address: {
            line1: '124 Conch Street',
            line2: 'Bikini Bottom'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Meera Desai',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Meera Desai is a Neurologist with a patient-focused approach to diagnosing and treating neurological disorders. She is dedicated to providing clear communication and effective care.',
        fees: 50,
        address: {
            line1: '350 Fifth Avenue',
            line2: 'Manhattan, New York'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Suresh Iyer',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Suresh Iyer specializes in neurology, offering advanced diagnostic and therapeutic services. He is committed to helping patients manage neurological conditions with empathy and expertise.',
        fees: 50,
        address: {
            line1: '4059 Mt Lee Dr',
            line2: 'Hollywood, Los Angeles'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Pooja Reddy',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Pooja Reddy is a General Physician dedicated to preventive care and patient education. She works collaboratively with patients to achieve optimal health outcomes.',
        fees: 50,
        address: {
            line1: '1600 Amphitheatre Parkway',
            line2: 'Mountain View, California'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Manish Choudhary',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Manish Choudhary is a Gynecologist committed to providing comprehensive women’s healthcare. He emphasizes preventive screenings and individualized treatment plans.',
        fees: 60,
        address: {
            line1: '1 Infinite Loop',
            line2: 'Cupertino, California'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Aishwarya Pillai',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Aishwarya Pillai is a Dermatologist who offers expert care for a variety of skin conditions. She is passionate about helping patients achieve healthy, beautiful skin.',
        fees: 30,
        address: {
            line1: '3500 Deer Creek Road',
            line2: 'Palo Alto, California'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Olivia Turner',
        image: doc1,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Olivia Turner specializes in digestive system disorders and is dedicated to providing patient-centered care with a focus on accurate diagnosis and effective treatment.',
        fees: 70,
        address: {
            line1: '221 King\'s Road',
            line2: 'Chelsea, London'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Ethan Carter',
        image: doc2,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Ethan Carter is experienced in managing a wide range of gastrointestinal conditions and is committed to improving patient outcomes through evidence-based medicine.',
        fees: 75,
        address: {
            line1: '15 Abbey Road',
            line2: 'St John\'s Wood, London'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Mia Robinson',
        image: doc3,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Mia Robinson provides comprehensive care for digestive health and emphasizes preventive strategies and patient education.',
        fees: 65,
        address: {
            line1: '100 Queen\'s Gate',
            line2: 'South Kensington, London'
        }
    }
]