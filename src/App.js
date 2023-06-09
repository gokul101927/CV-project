import './App.css';
import React, { Component } from 'react';

import Header from './components/Header';
import EditPersonalDetails from './components/PersonalDetails/EditPersonalDetails';
import EditWorkDetails from './components/WorkDetails/EditWorkDetails';
import EditEducationDetails from './components/EducationDetails/EditEducationDetails';
import EditSkills from './components/Skills/EditSkills';
import EditProjects from './components/Projects/EditProjects';
import EditCertifications from './components/Certifications/EditCertifications';

import ViewPersonalDetails from './components/PersonalDetails/ViewPersonalDetails';
import ViewWorkDetails from './components/WorkDetails/ViewWorkDetails';
import ViewEducationDetails from './components/EducationDetails/ViewEducationDetails';
import ViewSkills from './components/Skills/ViewSkills';
import ViewProjects from './components/Projects/ViewProjects';
import ViewCertifications from './components/Certifications/ViewCertifications';

import { v4 as uuidv4 } from 'uuid';
import EditCustomSection from './components/CustomSection/EditCustomSection';
import ViewCustomSection from './components/CustomSection/ViewCustomSection';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editIsActive: true,
      viewIsActive: false,
      personalDetails: {
        name: '',
        jobTitle: '',
        mobileNumber: '',
        mailId: '',
        location: '',
        link: '',
        description: ''
      },
      workDetails: [],
      educationDetails: [],
      skills: '',
      projects: '',
      certifications: '',
      customSection: {
        customSectionHeading: '',
        customSectionContent: '',
      },
    }
  }

  handleButtonChange = () => {
    this.setState(prevState => ({
      editIsActive: !prevState.editIsActive,
      viewIsActive: !prevState.viewIsActive,
    }));
  }

  handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      personalDetails: {
        ...prevState.personalDetails,
        [name]: value
      }
    }));
  }

  handleWorkDetailsChange = (e, id) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      workDetails: prevState.workDetails.map(detail => {
        if (detail.id === id) {
          return {
            ...detail,
            [name]: value
          };
        } else {
          return detail;
        } 
      })
    }));
  }

  addWorkExperience = (e) => {
    e.preventDefault();
    const newWorkExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      experience: ''
    };
    this.setState(prevState => ({
      workDetails: [...prevState.workDetails, newWorkExperience],
    }));
  }

  deleteWorkExperience = (e, id) => {
    e.preventDefault();
    this.setState(prevState => ({
      workDetails: prevState.workDetails.filter(detail => detail.id !== id),
    }));
  }

  handleEducationDetailsChange = (e, id) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      educationDetails: prevState.educationDetails.map(detail => {
        if (detail.id === id) {
          return {
            ...detail,
            [name]: value
          };
        } else {
          return detail;
        }
      })
    }));
  }

  addEducation = (e) => {
    e.preventDefault();
    const newEducation = {
      id: uuidv4(),
      university: '',
      course: '',
      startDate: '',
      endDate: '',
      experience: ''
    };
    this.setState(prevState => ({
      educationDetails: [...prevState.educationDetails, newEducation],
    }));
  }

  deleteEducation = (e, id) => {
    e.preventDefault();
    this.setState(prevState => ({
      educationDetails: prevState.educationDetails.filter(detail => detail.id !== id),
    }));
  }

  handleSkillsChange = (e) => {
    this.setState({
      skills: e.target.value
    });
  }

  handleProjectsChange = (e) => {
    this.setState({
      projects: e.target.value
    });
  }

  handleCertificationsChange = (e) => {
    this.setState({
      certifications: e.target.value
    });
  }

  handleCustomSectionChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      customSection: {
        ...prevState.customSection,
        [name]: value
        
      }
    }));
  }

  handlePrint = () => {
    window.print();
  }

  render() {
    const { personalDetails, editIsActive, viewIsActive, workDetails, educationDetails, skills, projects, certifications, customSection } = this.state;
    return (
      <div className="App">
        <Header className="header" handleButtonChange={this.handleButtonChange} editIsActive={editIsActive} viewIsActive={viewIsActive} />
        <div className={editIsActive ? "editor no-print" : "editor hide no-print"}>
          <form>
            <EditPersonalDetails handlePersonalDetailsChange={this.handlePersonalDetailsChange} personalDetails={personalDetails} />
            <EditWorkDetails handleWorkDetailsChange={this.handleWorkDetailsChange} workDetails={workDetails} addWorkExperience={this.addWorkExperience} deleteWorkExperience={this.deleteWorkExperience}/>
            <EditEducationDetails handleEducationDetailsChange={this.handleEducationDetailsChange} educationDetails={educationDetails} addEducation={this.addEducation} deleteEducation={this.deleteEducation} />
            <EditSkills handleSkillsChange={this.handleSkillsChange} skills={skills} />
            <EditProjects handleProjectsChange={this.handleProjectsChange} projects={projects} />
            <EditCertifications handleCertificationsChange={this.handleCertificationsChange} certifications={certifications} />
            <EditCustomSection handleCustomSectionChange={this.handleCustomSectionChange} customSection={customSection} />
          </form>
        </div>

        
        <div className={viewIsActive ? "preview" : "preview hide"}>
          <div id="a4-size">
            <ViewPersonalDetails personalDetails={personalDetails} />
            <ViewWorkDetails workDetails={workDetails} />
            <ViewEducationDetails educationDetails={educationDetails} />
            <ViewSkills skills={skills} />
            <ViewProjects projects={projects} />
            <ViewCertifications certifications={certifications} />
            <ViewCustomSection customSection={customSection} />
          </div>
        </div>
        {viewIsActive ? <button className="print-btn btn no-print" onClick={this.handlePrint}>Print</button> : null}
      </div>
    );
  }
}

export default App;
