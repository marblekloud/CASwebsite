// booksControllers.js
const Text = require('../models/text');
const mongoose = require('mongoose');
const express = require('express');

// Defining all methods and business logic for routes

module.exports = {
	sendText: function(req, res) {
		console.log(req.body);
            // check for existing images
            Text.findOne({ caption: req.body.caption })
                .then((text) => {
                    console.log(text);

                    let newText = new Text({
                        sender: req.body.sender,
                        description: req.body.description,
                    });
                
                        newText.save()
                        .then((text) => {
                                    return res.status(200).json({
                                        success: true,
                                        text,
                                    });
                        })

                })
	},
	getTexts: function(req, res) {
		Text.find({})
                .then(texts => {
                    res.status(200).json({
                        success: true,
                        texts,
                    });
                })
	},
	deleteText: function(req, res) {
		Text.findOne({ _id: req.params.id })
                .then((text) => {
                    if (text) {
                        Text.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: `Text with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
	}
};