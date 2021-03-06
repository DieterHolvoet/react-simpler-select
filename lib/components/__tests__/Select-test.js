import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Select from '../../index';

// Converts a DOM NodeList or other iterable to a JS array.
const toArray = iterable => Array.prototype.slice.call(iterable);

const options = [
  { value: 'es', label: 'Spanish' },
  { value: 'cs', label: 'Czech' },
  { value: 'en', label: 'English' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
];

const optgroups = [
  {
    title: 'North Island',
    id: 'ni',
    options: [
      { value: 'wgtn', label: 'Wellington' },
      { value: 'gsb', label: 'Gisbourne' },
      { value: 'oh', label: 'Ohakune' },
    ],
  },
  {
    title: 'South Island',
    id: 'si',
    options: [
      { value: 'ch', label: 'Christchurch' },
      { value: 'qt', label: 'Queenstown' },
      { value: 'te', label: 'lake Tekapo' },
    ],
  },
];

/* eslint func-names:0 */
describe('Select', () => {
  let item;
  let select;

  describe('props', () => {
    beforeEach(() => {
      item = TestUtils.renderIntoDocument(
        <Select
          name="decision"
          id="decision-selector"
          className="field-select"
          placeholder="Your decision"
          options={[]}
          required
        />
      );
      select = ReactDOM.findDOMNode(item);
    });

    it('#id', () => {
      expect(select.id).to.equal('decision-selector');
    });

    it('#name', () => {
      expect(select.name).to.equal('decision');
    });

    it('#className', () => {
      expect(select.className).to.equal('field-select');
    });

    it('#placeholder', () => {
      expect(select[0].innerHTML).to.equal('Your decision');
    });

    it('#options (empty)', () => {
      expect(select.options.length).to.equal(1);
    });

    it('#required', () => {
      expect(select.required).to.equal(true);
    });
  });

  describe('#options', () => {
    beforeEach(() => {
      item = TestUtils.renderIntoDocument(
        <Select
          options={options}
          value="en"
        />
      );
      select = ReactDOM.findDOMNode(item);
    });

    it('should have 5 <options>', () => {
      expect(select.options.length).to.equal(5);
    });

    it('first one should be Spanish', () => {
      expect(select.options[0].innerHTML).to.equal('Spanish');
    });

    it('current value should be en (English)', () => {
      expect(select.value).to.equal('en');
    });

    it('should change the value', (done) => {
      const handleChange = (value) => {
        expect(value).to.equal('fi');
        done();
      };

      item = TestUtils.renderIntoDocument(
        <Select
          options={options}
          value="en"
          onChange={handleChange}
        />
      );
      select = ReactDOM.findDOMNode(item);

      expect(select.value).to.equal('en');
      TestUtils.Simulate.change(select, { target: { value: 'fi' } });
      expect(select.value).to.equal('en');
    });
  });

  describe('#optgroups', () => {
    beforeEach(() => {
      item = TestUtils.renderIntoDocument(
        <Select
          options={optgroups}
          value="wgtn"
        />
      );
      select = ReactDOM.findDOMNode(item);
    });

    it('should have 6 <options>', () => {
      expect(select.options.length).to.equal(6);
    });

    it('second option should be Gisbourne', () => {
      expect(select.options[1].innerHTML).to.equal('Gisbourne');
    });

    it('current value should be wgtn (Wellington)', () => {
      expect(select.value).to.equal('wgtn');
    });

    it('should change the value', (done) => {
      const handleChange = (value) => {
        expect(value).to.equal('qt');
        done();
      };

      item = TestUtils.renderIntoDocument(
        <Select
          options={optgroups}
          value="wgtn"
          onChange={handleChange}
        />
      );
      select = ReactDOM.findDOMNode(item);

      expect(select.value).to.equal('wgtn');
      TestUtils.Simulate.change(select, { target: { value: 'qt' } });
      expect(select.value).to.equal('wgtn');
    });
  });

  describe('#multiple', () => {
    beforeEach(() => {
      item = TestUtils.renderIntoDocument(
        <Select
          options={options}
          value={['es', 'fi']}
        />
      );
      select = ReactDOM.findDOMNode(item);
    });

    it('current values should be es, fi', () => {
      expect(toArray(select.options).filter(opt => opt.selected).map(opt => opt.value)).to.include.members(['es', 'fi']);
    });

    it('should change the values', (done) => {
      const handleChange = (values) => {
        expect(values).to.include.members(['en']);
        done();
      };

      item = TestUtils.renderIntoDocument(
        <Select
          options={options}
          value={['es', 'fi']}
          onChange={handleChange}
        />
      );
      select = ReactDOM.findDOMNode(item);

      expect(toArray(select.options).filter(opt => opt.selected).map(opt => opt.value)).to.include.members(['es', 'fi']);
      TestUtils.Simulate.change(select, { target: { options: [{ value: 'es', selected: false }, { value: 'cs', selected: false }, { value: 'en', selected: true }, { value: 'fi', selected: false }, { value: 'fr', selected: false }] } });
      expect(toArray(select.options).filter(opt => opt.selected).map(opt => opt.value)).to.include.members(['es', 'fi']);
    });
  });
});
