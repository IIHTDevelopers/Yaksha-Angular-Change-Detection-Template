import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockTaskService {
  tasks: Task[] = [];

  getTasks() {
    return of(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: MockTaskService;

  const mockTasks: Task[] = [
    { id: 1, name: 'Test Task 1', status: 'Pending' },
    { id: 2, name: 'Test Task 2', status: 'In Progress' }
  ];

  beforeEach(() => {
    taskService = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskService }  // Use mock service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  describe('bounday', () => {
    it('should display "No tasks available!" when there are no tasks', () => {
      taskService.tasks = []; // Set the task list to empty
      fixture.detectChanges(); // Trigger change detection to update the view

      const noTasksMessage = fixture.nativeElement.querySelector('div');
      expect(noTasksMessage.textContent).toBe('No tasks available!');
    });

    it('should remove the task from the list after delete', () => {
      taskService.tasks = mockTasks; // Set mock tasks
      fixture.detectChanges(); // Trigger change detection to update the view

      // Trigger delete on the first task
      component.deleteTask(mockTasks[0].id);

      // After deletion, the task list should have one less task
      expect(taskService.tasks.length).toBe(mockTasks.length - 1);
      expect(taskService.tasks[0].id).toBe(mockTasks[1].id); // Verify the remaining task
    });
  });
});
