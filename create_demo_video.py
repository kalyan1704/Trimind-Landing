#!/usr/bin/env python3
"""
TriMind Demo Video Creator
Creates a professional demo video showcasing the TriMind platform
"""

import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from matplotlib.patches import Circle, Rectangle
import subprocess
import os
from PIL import Image, ImageDraw, ImageFont
import math

# Set up the figure and axis
fig, ax = plt.subplots(figsize=(16, 9))
fig.patch.set_facecolor('#0f0f23')
ax.set_facecolor('#0f0f23')
ax.set_xlim(0, 16)
ax.set_ylim(0, 9)
ax.axis('off')

# Colors
primary_color = '#667eea'
secondary_color = '#764ba2'
accent_color = '#48bb78'
text_color = '#ffffff'
background_color = '#0f0f23'

def create_title_slide(frame):
    """Create the opening title slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Animated AI Mind Logo
    center_x, center_y = 8, 5
    time = frame * 0.1
    
    # Core brain
    brain = Circle((center_x, center_y), 1, color=primary_color, alpha=0.8)
    ax.add_patch(brain)
    
    # Neural network dots
    for i in range(6):
        angle = i * 60 + time * 30
        x = center_x + 0.3 * math.cos(math.radians(angle))
        y = center_y + 0.3 * math.sin(math.radians(angle))
        neuron = Circle((x, y), 0.05, color=accent_color, alpha=0.8)
        ax.add_patch(neuron)
    
    # Orbiting elements
    orbits = [
        (1.5, 30, '₿', '#f7931a'),  # Bitcoin
        (2.0, -20, '📈', '#00d4aa'),  # Stocks
        (2.5, 15, '📊', '#667eea'),  # Charts
        (3.0, -25, '💹', '#ff6b6b')   # Trading
    ]
    
    for radius, speed, symbol, color in orbits:
        angle = time * speed
        x = center_x + radius * math.cos(math.radians(angle))
        y = center_y + radius * math.sin(math.radians(angle))
        
        # Orbit path
        orbit_circle = Circle((center_x, center_y), radius, 
                            fill=False, color=color, alpha=0.3, linewidth=1)
        ax.add_patch(orbit_circle)
        
        # Symbol
        ax.text(x, y, symbol, fontsize=20, ha='center', va='center', 
               color=color, weight='bold')
    
    # Title text
    ax.text(8, 7.5, 'TriMind', fontsize=48, ha='center', va='center',
           color=text_color, weight='bold')
    ax.text(8, 6.8, 'AI-Powered Copycat Trading', fontsize=24, ha='center', va='center',
           color=primary_color, weight='bold')
    ax.text(8, 6.2, 'That Actually Works', fontsize=18, ha='center', va='center',
           color=text_color, alpha=0.8)

def create_problem_slide(frame):
    """Create the problem statement slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Title
    ax.text(8, 8, 'Traditional Trading Challenges', fontsize=32, ha='center', va='center',
           color=text_color, weight='bold')
    
    # Left side - Traditional Trading
    ax.text(4, 6.5, 'Traditional Trading', fontsize=20, ha='center', va='center',
           color='#ff6b6b', weight='bold')
    
    problems = [
        '❌ Time-consuming analysis',
        '❌ Emotional decisions',
        '❌ Limited data processing',
        '❌ Poor success rates',
        '❌ 24/7 monitoring impossible'
    ]
    
    for i, problem in enumerate(problems):
        ax.text(4, 5.5 - i * 0.4, problem, fontsize=14, ha='center', va='center',
               color=text_color, alpha=0.8)
    
    # Right side - AI Trading
    ax.text(12, 6.5, 'AI-Powered Trading', fontsize=20, ha='center', va='center',
           color=accent_color, weight='bold')
    
    solutions = [
        '✅ Instant analysis',
        '✅ Objective decisions',
        '✅ Multi-source data',
        '✅ 95% accuracy rate',
        '✅ 24/7 monitoring'
    ]
    
    for i, solution in enumerate(solutions):
        ax.text(12, 5.5 - i * 0.4, solution, fontsize=14, ha='center', va='center',
               color=text_color, alpha=0.8)
    
    # Arrow
    ax.arrow(6.5, 4, 3, 0, head_width=0.2, head_length=0.2, 
            fc=primary_color, ec=primary_color, linewidth=3)

def create_solution_slide(frame):
    """Create the solution overview slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Title
    ax.text(8, 8, 'Four AI Agents Working Together', fontsize=32, ha='center', va='center',
           color=text_color, weight='bold')
    
    # Central AI core
    center_x, center_y = 8, 4.5
    time = frame * 0.1
    
    # AI Brain
    brain = Circle((center_x, center_y), 1.2, color=primary_color, alpha=0.9)
    ax.add_patch(brain)
    ax.text(center_x, center_y, '🧠', fontsize=40, ha='center', va='center')
    
    # Four AI agents
    agents = [
        (4, 6, '🧠', 'Sentiment\nAnalysis', '#f7931a'),
        (12, 6, '📊', 'Technical\nIndicators', '#00d4aa'),
        (4, 3, '🐋', 'Whale\nTracking', '#667eea'),
        (12, 3, '📈', 'Fundamental\nData', '#ff6b6b')
    ]
    
    for x, y, icon, name, color in agents:
        # Connection line
        ax.plot([center_x, x], [center_y, y], color=color, alpha=0.6, linewidth=2)
        
        # Agent circle
        agent_circle = Circle((x, y), 0.8, color=color, alpha=0.8)
        ax.add_patch(agent_circle)
        
        # Icon and name
        ax.text(x, y + 0.2, icon, fontsize=24, ha='center', va='center')
        ax.text(x, y - 0.3, name, fontsize=12, ha='center', va='center',
               color=text_color, weight='bold')

def create_dashboard_slide(frame):
    """Create the dashboard walkthrough slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Title
    ax.text(8, 8.5, 'Live Trading Dashboard', fontsize=28, ha='center', va='center',
           color=text_color, weight='bold')
    
    # Dashboard background
    dashboard = Rectangle((1, 1), 14, 7, color='#1a1a2e', alpha=0.8, linewidth=2, 
                         edgecolor=primary_color)
    ax.add_patch(dashboard)
    
    # Live metrics
    metrics = [
        ('Current Price', '$2,450.50', '+2.34%'),
        ('Sentiment Score', '85%', 'Positive'),
        ('Technical Direction', 'UP', 'Strong'),
        ('Whale Activity', 'BUY', 'Accumulating')
    ]
    
    for i, (label, value, status) in enumerate(metrics):
        x = 2.5 + (i % 2) * 6
        y = 6.5 - (i // 2) * 1.5
        
        ax.text(x, y + 0.3, label, fontsize=12, ha='left', va='center',
               color=text_color, alpha=0.7)
        ax.text(x, y, value, fontsize=16, ha='left', va='center',
               color=accent_color, weight='bold')
        ax.text(x, y - 0.3, status, fontsize=10, ha='left', va='center',
               color='#48bb78', alpha=0.8)
    
    # AI Decision
    decision_box = Rectangle((2, 2.5), 12, 1.5, color=primary_color, alpha=0.3)
    ax.add_patch(decision_box)
    ax.text(8, 3.5, 'AI Decision: GO LONG', fontsize=20, ha='center', va='center',
           color=text_color, weight='bold')
    ax.text(8, 3, 'Confidence: 87%', fontsize=14, ha='center', va='center',
           color=accent_color)

def create_features_slide(frame):
    """Create the features highlight slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Title
    ax.text(8, 8, 'Key Features', fontsize=32, ha='center', va='center',
           color=text_color, weight='bold')
    
    features = [
        ('⚡', 'Real-Time Analysis', 'Instant market data and AI insights'),
        ('🔒', 'Secure & Reliable', 'Enterprise-grade security'),
        ('📱', 'Mobile Responsive', 'Trade anywhere, anytime'),
        ('🤖', 'AI-Powered Signals', '95% accuracy rate'),
        ('📊', 'Advanced Metrics', 'Comprehensive risk assessment'),
        ('🔔', 'Smart Notifications', 'Never miss opportunities')
    ]
    
    for i, (icon, title, desc) in enumerate(features):
        x = 2.5 + (i % 3) * 4
        y = 6.5 - (i // 3) * 2
        
        # Feature box
        feature_box = Rectangle((x - 0.5, y - 0.8), 3, 1.6, color='#1a1a2e', 
                               alpha=0.8, linewidth=1, edgecolor=primary_color)
        ax.add_patch(feature_box)
        
        ax.text(x, y + 0.3, icon, fontsize=24, ha='center', va='center')
        ax.text(x, y, title, fontsize=12, ha='center', va='center',
               color=text_color, weight='bold')
        ax.text(x, y - 0.3, desc, fontsize=8, ha='center', va='center',
               color=text_color, alpha=0.7)

def create_cta_slide(frame):
    """Create the call-to-action slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Title
    ax.text(8, 7, 'Ready to Start Trading Smarter?', fontsize=32, ha='center', va='center',
           color=text_color, weight='bold')
    
    # Stats
    stats = [
        ('95%', 'Accuracy Rate'),
        ('24/7', 'Monitoring'),
        ('$2M+', 'Traded Volume')
    ]
    
    for i, (value, label) in enumerate(stats):
        x = 4 + i * 4
        ax.text(x, 5.5, value, fontsize=36, ha='center', va='center',
               color=accent_color, weight='bold')
        ax.text(x, 5, label, fontsize=14, ha='center', va='center',
               color=text_color, alpha=0.8)
    
    # CTA buttons
    button1 = Rectangle((5, 3), 2.5, 0.8, color=accent_color, alpha=0.8)
    ax.add_patch(button1)
    ax.text(6.25, 3.4, 'Start Trading Now', fontsize=14, ha='center', va='center',
           color=text_color, weight='bold')
    
    button2 = Rectangle((8.5, 3), 2.5, 0.8, color=primary_color, alpha=0.8)
    ax.add_patch(button2)
    ax.text(9.75, 3.4, '14-Day Free Trial', fontsize=14, ha='center', va='center',
           color=text_color, weight='bold')
    
    # Subtitle
    ax.text(8, 2, 'No credit card required • Let AI do the heavy lifting', 
           fontsize=16, ha='center', va='center', color=text_color, alpha=0.8)

def create_closing_slide(frame):
    """Create the closing slide"""
    ax.clear()
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.set_facecolor(background_color)
    ax.axis('off')
    
    # Animated logo
    center_x, center_y = 8, 5
    time = frame * 0.1
    
    # Core brain
    brain = Circle((center_x, center_y), 1.5, color=primary_color, alpha=0.9)
    ax.add_patch(brain)
    ax.text(center_x, center_y, '🧠', fontsize=50, ha='center', va='center')
    
    # Orbiting elements
    orbits = [
        (2, 30, '₿', '#f7931a'),
        (2.5, -20, '📈', '#00d4aa'),
        (3, 15, '📊', '#667eea'),
        (3.5, -25, '💹', '#ff6b6b')
    ]
    
    for radius, speed, symbol, color in orbits:
        angle = time * speed
        x = center_x + radius * math.cos(math.radians(angle))
        y = center_y + radius * math.sin(math.radians(angle))
        ax.text(x, y, symbol, fontsize=20, ha='center', va='center', 
               color=color, weight='bold')
    
    # Final message
    ax.text(8, 7.5, 'TriMind', fontsize=48, ha='center', va='center',
           color=text_color, weight='bold')
    ax.text(8, 6.8, 'AI-Powered Copycat Trading That Actually Works', 
           fontsize=20, ha='center', va='center', color=primary_color, weight='bold')
    ax.text(8, 6.2, 'Start your journey today', fontsize=16, ha='center', va='center',
           color=text_color, alpha=0.8)

def animate(frame):
    """Main animation function"""
    # Determine which slide to show based on frame
    if frame < 60:  # 0-2 seconds
        create_title_slide(frame)
    elif frame < 120:  # 2-4 seconds
        create_problem_slide(frame - 60)
    elif frame < 180:  # 4-6 seconds
        create_solution_slide(frame - 120)
    elif frame < 240:  # 6-8 seconds
        create_dashboard_slide(frame - 180)
    elif frame < 300:  # 8-10 seconds
        create_features_slide(frame - 240)
    elif frame < 360:  # 10-12 seconds
        create_cta_slide(frame - 300)
    else:  # 12+ seconds
        create_closing_slide(frame - 360)

def create_video():
    """Create the demo video"""
    print("Creating TriMind demo video...")
    
    # Create animation
    anim = animation.FuncAnimation(fig, animate, frames=420, interval=50, repeat=False)
    
    # Save as MP4
    print("Rendering video...")
    anim.save('trimind_demo.mp4', writer='ffmpeg', fps=20, 
             extra_args=['-vcodec', 'libx264', '-pix_fmt', 'yuv420p'])
    
    print("Video created successfully: trimind_demo.mp4")
    
    # Get video duration
    result = subprocess.run(['ffprobe', '-v', 'quiet', '-show_entries', 
                           'format=duration', '-of', 'csv=p=0', 'trimind_demo.mp4'], 
                          capture_output=True, text=True)
    duration = float(result.stdout.strip())
    print(f"Video duration: {duration:.2f} seconds")

if __name__ == "__main__":
    create_video() 