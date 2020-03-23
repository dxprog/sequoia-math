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

export default class GetEquation extends Component {
  construct() {
    this.studentIdRef = React.createRef();
    this.studentNameRef = React.createRef();
    this.teacherNameRef = React.createRef();
  }

  render() {
    return (
      <div className="student-form">
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
        <button className="student-form__button">
          Submit
        </button>
      </div>
    );
  }
}
