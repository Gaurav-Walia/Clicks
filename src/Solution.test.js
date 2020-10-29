import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Solution from './Solution';

configure({ adapter: new Adapter() });

describe("Solution", () => {
  describe("Test solution component", () => {
    it("should render correctly", () => {
      shallow(<Solution />);    
    });
  });

  describe("Start link on solution component", () => {
    it('should render successfully', () => {
      render(<Solution />);
      const linkElement = screen.getByText(/Download/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
  
  describe("State inside Solution componnent", () => {
    it('should initialize successfully with clicks data', () => {
      const app = shallow(<Solution />);
      expect(app.state("clicks")).toEqual(expect.arrayContaining([expect.objectContaining({ "ip":"22.22.22.22", "timestamp":"3/11/2016 02:02:58", "amount": 7.00 })]));
    });
  });
  
  describe("Resultset.json should be downloaded", () => {
    it('should successfully download resultset.json', () => {
      const link = { click: jest.fn() };
      jest.spyOn(document, "createElement").mockImplementation(() => link);
      global.URL.createObjectURL = jest.fn();
      const s = new Solution();
      s.downloadFile();
      expect(link.download).toEqual("resultset.json");
      expect(link.click).toHaveBeenCalledTimes(1);
    }); 

    it('should be subset of clicks data', () => {
      const app = shallow(<Solution />);
      const link = { click: jest.fn() };
      jest.spyOn(document, "createElement").mockImplementation(() => link);
      global.URL.createObjectURL = jest.fn();
      const s = new Solution();
      s.downloadFile();
      expect(app.state("clicks")).toEqual(expect.arrayContaining([expect.objectContaining({"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:40","amount":8})]));
    });

  });
  
  
});




