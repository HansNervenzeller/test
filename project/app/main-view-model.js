import { Observable } from '@nativescript/core';
import { View } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();
    
    // Initialize stats
    viewModel.headsCount = 0;
    viewModel.tailsCount = 0;
    viewModel.result = "Tap to flip!";
    
    // Animation properties
    let isFlipping = false;
    let currentRotation = 0;
    
    viewModel.onFlip = async (args) => {
        if (isFlipping) return;
        
        isFlipping = true;
        const coin = args.object.page.getViewById('coin');
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        
        // Animate coin flip
        const rotations = 5 + Math.floor(Math.random() * 3); // Random number of rotations
        const finalRotation = currentRotation + (360 * rotations);
        
        coin.animate({
            rotate: finalRotation,
            duration: 1000,
            curve: 'easeOut'
        }).then(() => {
            currentRotation = finalRotation;
            
            // Update stats
            if (result === 'heads') {
                viewModel.set('headsCount', viewModel.headsCount + 1);
                viewModel.set('result', 'HEADS!');
            } else {
                viewModel.set('tailsCount', viewModel.tailsCount + 1);
                viewModel.set('result', 'TAILS!');
            }
            
            // Update pie chart
            updatePieChart(viewModel.headsCount, viewModel.tailsCount, args.object.page);
            
            isFlipping = false;
        });
    };
    
    return viewModel;
}

function updatePieChart(heads, tails, page) {
    const container = page.getViewById('chartContainer');
    container.removeChildren();
    
    const total = heads + tails;
    if (total === 0) return;
    
    const headsAngle = (heads / total) * 360;
    
    // Create pie segments
    if (heads > 0) {
        const headsSegment = new View();
        headsSegment.backgroundColor = '#4CAF50';
        container.addChild(headsSegment);
        headsSegment.width = 200;
        headsSegment.height = 200;
        headsSegment.borderRadius = 100;
    }
    
    if (tails > 0) {
        const tailsSegment = new View();
        tailsSegment.backgroundColor = '#2196F3';
        container.addChild(tailsSegment);
        tailsSegment.width = 200;
        tailsSegment.height = 200;
        tailsSegment.borderRadius = 100;
    }
}