import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../models/task.model';
import { ChangeDetectorRef } from '@angular/core';

class MockTaskService {
  updateTaskStatus(id: number, status: string): void {
    // Mock implementation of updateTaskStatus
  }
}

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskService: MockTaskService;
  let changeDetectorRef: ChangeDetectorRef;

  const mockTask: Task = {
    id: 1,
    name: 'Test Task',
    status: 'Pending'
  };

  beforeEach(() => {
    taskService = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [
        { provide: TaskService, useValue: taskService },  // Use mock service
        ChangeDetectorRef  // Inject ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask; // Initialize the task input
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);  // Correctly inject ChangeDetectorRef
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should display task name and status correctly', () => {
      const taskNameElement = fixture.nativeElement.querySelector('span:nth-child(1)');
      const taskStatusElement = fixture.nativeElement.querySelector('span:nth-child(2)');

      expect(taskNameElement.textContent).toBe(mockTask.name);
      expect(taskStatusElement.textContent).toBe(mockTask.status);
    });

    it('should call updateTaskStatus when toggleStatus is clicked', () => {
      jest.spyOn(taskService, 'updateTaskStatus');

      // Trigger the button click event
      const button = fixture.nativeElement.querySelector('button');
      button.click();

      // Verify that the taskService.updateTaskStatus method was called
      expect(taskService.updateTaskStatus).toHaveBeenCalledWith(mockTask.id, 'In Progress');
    });
  });
});
