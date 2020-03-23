import React, { Component } from 'react';

import './GetEquation.scss';

const TEACHERS = [
  'Ms. Alexander',
  'Ms. Demailly',
  'Ms. Howard',
];

function renderInput(name, label, ref) {
  return (
    <div className="student-form__input">
      <label
        for={name}
        className="input__label"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="input__field"
        ref={ref}
      />
    </div>
  );
}

class GetEquation extends Component {
  constructor(props) {
    super(props);

    this.studentIdRef = React.createRef();
    this.studentNameRef = React.createRef();
    this.teacherNameRef = React.createRef();

    this.state = {
      imageLink: null,
      errorMessage: null,
      loading: null
    };
  }

  handleSubmitClick(evt) {
    const { images, id } = this.props;
    const payload = {
      id,
      images,
      studentId: this.studentIdRef.current.value,
      studentName: this.studentNameRef.current.value,
      teacherName: this.teacherNameRef.current.value,
    };

    this.setState({
      loading: true
    });

    fetch('//beta.sequoiamath.work/submit-entry', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            imageLink: data.image,
            loading: false
          });
        } else {
          if (data.reason === 'validation') {
            this.setState({
              errorMessage: 'Please fill out all fields and your six-digit student ID',
              loading: false
            });
          } else {
            this.setState({
              errorMessage: 'Oh no! Something went wrong. Please e-mail your teacher for your assignment',
              loading: false
            });
          }
        }
      });
  }

  render() {
    if (this.state.imageLink) {
      return (
        <img
          src={this.state.imageLink}
          alt="equation image"
          className="equation"
        />
      );
    }

    return (
      <div className="student-form">
        {this.state.loading && (
          <div class="loader"></div>
        )}
        {this.state.errorMessage && (
          <p className="error">
            {this.state.errorMessage}
          </p>
        )}
        {renderInput('studentId', 'Student ID', this.studentIdRef)}
        {renderInput('studentName', 'Student Name', this.studentNameRef)}
        <div className="student-form__input">
          <label
            for="teacherName"
            className="input__label"
          >
            Teacher Name
          </label>
          <select
            name="teacherName"
            id="teacherName"
            className="input__select"
            ref={this.teacherNameRef}
          >
            {TEACHERS.map((name, index) => (
              <option value={name} key={`teacher-${index}`}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="student-form__button"
          onClick={evt => this.handleSubmitClick(evt)}
          type="button"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default GetEquation;
