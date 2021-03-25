package com.restservice.RestApp.controller;

import com.restservice.RestApp.model.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.restservice.RestApp.service.ICityService;

import java.util.List;

@Controller
public class CityController {

    @Autowired
    private ICityService cityService;

    @GetMapping("/cities")
    public String findCities(Model model) {

        List<City> cities = cityService.findAll();

        model.addAttribute("cities", cities);

        return "showCities";
    }
}
